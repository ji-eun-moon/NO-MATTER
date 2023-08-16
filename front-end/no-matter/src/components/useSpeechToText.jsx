import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import React, { useState, useEffect } from 'react'
import axiosInstance from '../config/axios.jsx'

import io from 'socket.io-client'
const BrokerAddress = 'http://i9c105.p.ssafy.io:3002'

const useSpeechToText = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
    }
  }

  const processCommand = (transcript) => {
    if (transcript) {
      const words = transcript.split(' '); // 음성 입력을 공백을 기준으로 나눔
      if (words.length >= 2) {
        const location = words[0];
        const command = words.slice(1).join('').trim();
  
        console.log(`Location: ${location}`);
        console.log(`Command: ${command}`);
  
        // 이후 필요한 동작 실행
        if (location && command) {
          // uuid 받아오기
             axiosInstance({
              method : 'Get',
              url : `/hub/command/${location}`,
            })
            .then((response) => {
              // console.log(response.data)
							const topic = response.data + '/VOICE/';
							publishMessage(topic, command);
							resetTranscript()
            })
						.catch((err) => {
							alert('다시 말씀해주세요.')
							resetTranscript()
							console.log('허브 없음')
						})
          }
        } else {
          console.log('명령을 처리할 수 없습니다.');
        }
      }
    };

    // 음성 인식 전송
    const [topic, setTopic] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(BrokerAddress, {
        cors: {origin: '*'}
        });

        newSocket.on('connect', () => {
        console.log('Connected to the broker.');
        });
        
        // 새로운 메시지를 수신할 때 실행될 이벤트 핸들러
        newSocket.on('message', (receivedMessage) => {
        console.log(`Received message: ${receivedMessage}`);
        });
        
        setSocket(newSocket);

        return () => {
        newSocket.disconnect();
        };
    }, []);

    const subscribeToTopic = () => {
        if (socket && topic) {
        socket.emit('subscribe', topic);
        console.log(`Subscribed to topic: ${topic}`);
        }
    };

    const publishMessage = (topic, message) => {
        if (socket && topic && message) {
        socket.emit('publish', { topic, message });
        console.log(`Published message "${message}" to topic: ${topic}`);
        }
    };

  return { transcript, listening, toggleListening, resetTranscript, processCommand };

};

export default useSpeechToText;