#include <iostream>
#include <wiringPi.h>
#include <mosquitto.h>
#include <vector>
#include <string>
#include <cstring>
#include <unistd.h>
#include <thread>
#include <chrono>
#include "commands.h"

const int BUTTON_PIN = 17;
const int LED_PIN = 18;
volatile bool isPushed = false;


using namespace std;

struct MosquittoThreadData {
    struct mosquitto* mosq;
    int loop;
};

//MQTT를 사용하여 명령어를 받는 함수
void message_callback(struct mosquitto* mosq, void* userdata, const struct mosquitto_message* message) {
    if (message->payloadlen) {

        string command_line((char*)message->payload);
        vector<string> tokens;
        int startPos = 0, endPos;

        while ((endPos = command_line.find('/', startPos)) != string::npos) {
            tokens.push_back(command_line.substr(startPos, endPos - startPos));
            startPos = endPos + 1;
        }
        tokens.push_back(command_line.substr(startPos));

        if (strcmp("ADD", tokens[0].c_str())==0) {
            COMMAND_add(tokens[1],tokens[2]);

        }
        else if (strcmp("CONTROLL", tokens[0].c_str())==0) {
            COMMAND_controll(tokens[1],tokens[2]);
        }

        else if (strcmp("SHARE", tokens[0].c_str())==0) {
            cout << "share" << endl;
        }
        else {
            cout << "Unknown" << endl;
        }
    }

}


//MQTT Thread
void mosquittoLoopThread(MosquittoThreadData* data) {
    data->loop = mosquitto_loop_forever(data->mosq, -1, 1);
}


void buttonInterrupt(){
  isPushed=true;
}

void executeFunction() {
    //3초이상 눌렸을때 실행할 함수
}

int main() {
    wiringPiSetupGpio();
    
    pinMode(BUTTON_PIN,INPUT);
    pullUpDnControl(BUTTON_PIN, PUD_UP);
    wiringPiISR(BUTTON_PIN, INT_EDGE_FALLING, buttonInterrupt);

    //버튼 감지 -> 눌러서 와이파이 연결 되면 시작(isConnect)
    while (true)
    {
        if (bool netWork=isWiFiConnected()&&!isPushed) {
            //mosquitto 초기설정
            mosquitto_lib_init();

            struct mosquitto* mosq = mosquitto_new(NULL, true, NULL);
            if (!mosq) {
                cout << "Could not initialize mosquitto library." << endl;
                return 1;
            }

            mosquitto_message_callback_set(mosq, message_callback);

            if (mosquitto_connect(mosq, "52.79.89.118", 1883, 60) != MOSQ_ERR_SUCCESS) {
                cout << "Could not connect to the broker." << endl;
                return 1;
            }

            if (mosquitto_subscribe(mosq, NULL, "00000001-1d10-4282-b68c-e17c508b94f4/#", 0) != MOSQ_ERR_SUCCESS) {
                cout << "Subscribe failed." << endl;
                return 1;
            }
            //mosquitto Thread실행
            MosquittoThreadData threadData = { mosq, 0 };
            thread mosquittoThread(mosquittoLoopThread,&threadData);

           
           
            while (true)
            {
                if(isPushed){
                  isPushed=false;
                    auto startTime = chrono::steady_clock::now();
                    if (digitalRead(BUTTON_PIN)==LOW) {
                        auto currentTime = chrono::steady_clock::now();
                        auto elapsedTime = chrono::duration_cast<chrono::seconds>(currentTime - startTime).count();

                        if (elapsedTime >= 3) {
                            executeFunction();
                            break;
                        }
                        
                    }
                
                }
                if (threadData.loop != 0) {
                    // 서버의 브로커가 꺼진 경우 or 인터넷 수신 불가
                    mosquittoThread.join();
                    break;
                }
            }
            
           

            //mosquitto 종료
            mosquitto_destroy(mosq);
            mosquitto_lib_cleanup();
        }
        else if (isPushed) {
            //블루투스를 통해 새로운 인터넷 연결 시작.

            isPushed = false;
        }
        else {
            //인터넷 연결이 끊어졌을 경우
            sleep(10000); //10초 Delay
        }
        
    }


    return -1;
}

