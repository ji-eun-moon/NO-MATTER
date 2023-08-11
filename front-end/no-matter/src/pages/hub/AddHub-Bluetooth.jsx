import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import BluetoothRoundedIcon from '@mui/icons-material/BluetoothRounded';

function AddHub_Bluetooth({onBluetooth, onGattServer}) {
  const [characteristicValue, setCharacteristicValue] = useState('');
  const [characteristic, setCharacteristic] = useState(null);
  const [isConnected, setIsConnected] = useState(false) // 블루투스 연결 여부
  const [isConnecting, setIsConnecting] = useState(false)
  // const [gattServer, setGattServer] = useState(null);

  useEffect(() => {
    console.log('자식의 char', characteristic)
  }, [characteristic, characteristicValue])
    
  useEffect(() => {
    onBluetooth(characteristic, characteristicValue)
    console.log(characteristic)
  }, [characteristic, characteristicValue])

  // const onGattServer = () => {
  //   setGattServer(server)
  // }

  const handleConnect = (event) => {
    event.stopPropagation()
    if ('bluetooth' in navigator) {
      // Web Bluetooth API 지원하는 경우, 스캔 및 연결 코드 작성
      navigator.bluetooth.requestDevice({
        filters: [{ name: 'NoMatter'}],
        optionalServices: ['00000001-1d10-4282-b68c-e17c508b94f4']
        //filters: [{ services: ['00000001-1d10-4282-b68c-e17c508b94f4'] }],
      })
      .then((device) => {
        setIsConnecting(true)
        console.log('BLE device:', device);
        return device.gatt.connect(
          {security: 'encrypt'}
        );
      })
      .then((server) => {
        // setGattServer(server)
        onGattServer(server)
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
        setIsConnected(true);
        setIsConnecting(false);         
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
        setIsConnecting(false);  
      });
    } else {
      console.log('Web Bluetooth API is not supported in this browser.');
    }
  };

  const renderBluetooth = () => {
    if ( isConnected ) {
      return (
        <div className='centered flex-column' style={{ height: "40vh", position: "relative" }}>
          <div className='centered flex-column' style={{ position: "relative", zIndex: 1 }}>
            <div className='mb-3'>
              <img src="/images/bluetooth.png" alt="bluetooth" style={{ width: '100px', height: '100px' }} />
            </div>
            <h1 className='font-700'>연결 완료</h1>
          </div>
          <div
            className='centered flex-column'
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#d0e0e3',
              filter: "blur(18px)",
              padding: "50px",
              borderRadius: "50%",
              zIndex: 0
            }}
          ></div>
        </div>
      )
    }
    if ( isConnecting ) {
      return (
        <div className='d-flex justify-content-center align-content-center justify-items-between' style={{marginTop:"20px", marginLeft:"20px"}}>
          <div style={{margin:"15px"}}><i className="bi bi-disc-fill" style={{fontSize:'80px'}}></i></div>
          
          <div className='d-flex flex-column' style={{margin:"18px"}}>
            <img src="/images/bluetooth.png" alt="bluetooth" style={{width:'20px', height:'20px', marginLeft:'20px'}}/>
            <img src="/images/connect.gif" alt="connect gif" style={{width:"60px"}} ></img>
          </div>
          <div>연결 중 ...</div>
          <div style={{margin:"15px 15px 15px 5px"}}><i className="bi bi-phone" style={{fontSize:'90px'}}></i></div>
        </div>
      )
    }
    return (
      <div className='flex-column centered'>
        <div className='flex-column centered'>
          <h3 style={{marginLeft:"10px", fontWeight:"500"}}>Bluetooth 연결</h3>
          <br />
        </div>
        <div className='flex-column centered mb-4'>
          <span style={{marginLeft:"10px", fontWeight:"500"}}>스마트폰의 블루투스 기능을 키고 </span>
          <span style={{marginLeft:"10px", fontWeight:"500"}}>허브의 전원을 켜서 기기를 연결하세요</span>
        </div>
        <div className='centered'>
          <Button onClick={handleConnect} variant="contained" startIcon={<BluetoothRoundedIcon />} style={{backgroundColor: "#0097B2"}}>
              Bluetooth
          </Button>
        </div>
      </div>
    )
  }
  return (
    <div className='container page-container'>
        {/* {isConnected ? 
          <div className='centered'>
            연결 완료
          </div>
        :        
          <div>
            <div className='flex-column centered'>
              <span style={{marginLeft:"10px", fontWeight:"500"}}>스마트폰의 블루투스 기능을 키고 </span>
              <span style={{marginLeft:"10px", fontWeight:"500"}}>허브의 전원을 켜서 기기를 연결하세요</span>
            </div>
            <div className='d-flex justify-content-center align-content-center justify-items-between' style={{marginTop:"20px", marginLeft:"20px"}}>
              <div style={{margin:"15px"}}><i className="bi bi-disc-fill" style={{fontSize:'80px'}}></i></div>
              
              <div className='d-flex flex-column' style={{margin:"18px"}}>
                <img src="/images/bluetooth.png" alt="bluetooth" style={{width:'20px', height:'20px', marginLeft:'20px'}}/>
                <img src="/images/connect.gif" alt="connect gif" style={{width:"60px"}} ></img>
              </div>

              <div style={{margin:"15px 15px 15px 5px"}}><i className="bi bi-phone" style={{fontSize:'90px'}}></i></div>
            </div>
            <div className='centered'>
              <Button onClick={handleConnect} variant="contained" startIcon={<BluetoothRoundedIcon />} style={{backgroundColor: "#0097B2"}}>
                  Bluetooth
              </Button>
            </div>
          </div>
        } */}
        {renderBluetooth()}
        {/* <Bluetooth onBluetooth={onBluetooth} /> */}
      </div>
  )
}

export default AddHub_Bluetooth