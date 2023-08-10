import json
import dbus

from ble_gatt_server.advertisement import Advertisement
from ble_gatt_server.service import Application, Service, Characteristic, Descriptor

GATT_CHRC_IFACE = "org.bluez.GattCharacteristic1"
NOTIFY_TIMEOUT = 5000

class MessageAdvertisement(Advertisement):
    def __init__(self, index):
        Advertisement.__init__(self, index, "peripheral")
        self.add_local_name("NoMatter")
        self.include_tx_power = True
    
class MessageService(Service):
    MESSAGE_SVC_UUID = "00000001-1d10-4282-b68c-e17c508b94f4"

    def __init__(self, index):
        Service.__init__(self, index, self.MESSAGE_SVC_UUID, True)
        self.add_characteristic(MsgCharacteristic(self))

    def get_msg_detail(self):
        return self.msg_detail

    def set_msg_detail(self, msg_detail):
        self.msg_detail = msg_detail

class MsgCharacteristic(Characteristic):
    MSG_CHARACTERISTIC_UUID = "00000002-1d10-4282-b68c-e17c508b94f4"

    def __init__(self, service):
        Characteristic.__init__(
                self, self.MSG_CHARACTERISTIC_UUID,
                ["read", "write"], service)
        self.add_descriptor(MsgDescriptor(self))

    def WriteValue(self, value, options):
        print("receive value: ", str(value), flush=True)
        
        # wifi_info.json
        val = "".join(map(chr, value))
        print("write value: ", val, flush=True)
        vals = val.split('/')

        
        data = {
            "wifi": {
                "ssid": vals[0],
                "psk": vals[1]
            },
            "user": {
                "id": 1234
            }
        }
        

        file_path = "./wifi_info.json"

        print("open file")
        with open(file_path, "w", encoding='utf-8') as file:
            json.dump(data, file)

        print("write value end")

        self.service.set_msg_detail(value) #value

        
    def ReadValue(self, options):
        print("read value")
        value = []

        val = self.service.get_msg_detail()
        value.append(dbus.Byte(val.encode()))
        print(value)

        return value

class MsgDescriptor(Descriptor):
    MSG_DESCRIPTOR_UUID = "0001"
    MSG_DESCRIPTOR_VALUE = "Message updates"

    def __init__(self, characteristic):
        Descriptor.__init__(
            self, self.MSG_DESCRIPTOR_UUID,
            ["read"],
            characteristic)

    def ReadValue(self, options):
        value = []
        desc = self.MSG_DESCRIPTOR_VALUE

        for c in desc:
            value.append(dbus.Byte(c.encode()))

        return value

app = Application()
app.add_service(MessageService(0))
app.register()

adv = MessageAdvertisement(0)
adv.register()

try:
    app.run()
except KeyboardInterrupt:
    app.quit()
