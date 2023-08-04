// src/App.js
import React, { useState } from 'react';

function App() {
  const [characteristicValue, setCharacteristicValue] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [characteristic, setCharacteristic] = useState(null);

  const handleConnect = () => {
    if ('bluetooth' in navigator) {
      // Web Bluetooth API 지원하는 경우, 스캔 및 연결 코드 작성
      navigator.bluetooth.requestDevice({
        filters: [{ name: 'NoMatter'}],
        optionalServices: ['00000001-1d10-4282-b68c-e17c508b94f4']
        //filters: [{ services: ['00000001-1d10-4282-b68c-e17c508b94f4'] }],
      })
      .then((device) => {
        console.log('BLE device:', device);
        return device.gatt.connect(
          {security: 'encrypt'}
        );
      })
      .then((server) => {
        return server.getPrimaryService('00000001-1d10-4282-b68c-e17c508b94f4');
      })
      .then((service) => {
        return service.getCharacteristic('00000002-1d10-4282-b68c-e17c508b94f4');
      })
      .then((characteristic) => {
        setCharacteristic(characteristic);
        console.log('Chr: ', characteristic)
        return characteristic.readValue();
      })
      .then((value) => {
        setCharacteristicValue(new TextDecoder().decode(value));
      })
      .catch((error) => {
        console.error('Error accessing BLE device:', error);
      });
    } else {
      console.log('Web Bluetooth API is not supported in this browser.');
    }
  };

  const handleWriteValue = (value) => {
    if (characteristic) {
      const data = new TextEncoder().encode(value);
      characteristic.writeValue(data)
        .then(() => {
          console.log('Data written successfully:', value);
          setCharacteristicValue(value);
        })
        .catch((error) => {
          console.error('Error writing data:', error);
        });
    }
  };

  const handleSend = () => {
    // 두 입력값을 합쳐서 하나의 값으로 보내는 경우
    const combinedValue = inputValue1 + '/' + inputValue2;
    handleWriteValue(combinedValue);
  };

  return (
    <div>
      <h1>React BLE PWA</h1>
      <p>Characteristic Value: {characteristicValue}</p>
      <input
        type="text"
        value={inputValue1}
        onChange={(e) => setInputValue1(e.target.value)}
      />
      <input
        type="text"
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)}
      />
      <button onClick={handleConnect}>Connect</button>
      <button onClick={handleSend}>Send Combined Value</button>
    </div>
  );
}

export default App;
