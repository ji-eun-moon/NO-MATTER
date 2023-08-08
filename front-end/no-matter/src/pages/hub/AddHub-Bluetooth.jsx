import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import BluetoothRoundedIcon from '@mui/icons-material/BluetoothRounded';

function AddHub_Bluetooth({onBluetooth}) {
  const [characteristicValue, setCharacteristicValue] = useState('');
  const [characteristic, setCharacteristic] = useState(null);

  useEffect(() => {
    console.log('자식의 char', characteristic)
  }, [characteristic, characteristicValue])
    
  useEffect(() => {
    onBluetooth(characteristic, characteristicValue)
    console.log(characteristic)
  }, [characteristic, characteristicValue])

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
        console.log(characteristic.properties.read)
        // onBluetooth(characteristic, characteristicValue)
        alert('블루투스 연결 성공')          
        // return characteristic.readValue();
      })
      // .then((value) => {
      //   // setCharacteristicValue(new TextDecoder().decode(value));
      //   let decValue = new TextDecoder().decode(value);
      //   setCharacteristicValue(decValue);
      //   onBluetooth(characteristic, characteristicValue)
      // })
      .catch((error) => {
        console.error('Error accessing BLE device:', error);
        alert('블루투스 연결 실패')
      });
    } else {
      console.log('Web Bluetooth API is not supported in this browser.');
    }
  };

  return (
    <div>
      <span style={{marginLeft:"10px"}}>스마트폰의 블루투스 기능을 키고 </span>
      <br /><span style={{marginLeft:"10px"}}>허브의 전원을 켜서 기기를 연결하세요</span>
      <br />
      <div className='d-flex justify-content-center align-content-center justify-items-between' style={{marginTop:"20px", marginLeft:"20px"}}>
        <div style={{margin:"15px"}}><i className="bi bi-disc-fill" style={{fontSize:'80px'}}></i></div>
        
        <div className='d-flex flex-column' style={{margin:"18px"}}>
          <img src="/images/bluetooth.png" alt="bluetooth" style={{width:'20px', height:'20px', marginLeft:'20px'}}/>
          <img src="/images/connect.gif" alt="connect gif" style={{width:"60px"}} ></img>
        </div>

        <div style={{margin:"15px 15px 15px 5px"}}><i className="bi bi-phone" style={{fontSize:'90px'}}></i></div>
      </div>
      <Button onClick={handleConnect} variant="contained" startIcon={<BluetoothRoundedIcon />} style={{backgroundColor: "#0097B2"}}>
          Bluetooth
        </Button>
      {/* <Bluetooth onBluetooth={onBluetooth} /> */}
    </div>
  )
}

export default AddHub_Bluetooth