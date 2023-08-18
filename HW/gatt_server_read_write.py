import json
<<<<<<< HEAD
=======
import subprocess

import sys
import time
>>>>>>> develop
import dbus

from ble_gatt_server.advertisement import Advertisement
from ble_gatt_server.service import Application, Service, Characteristic, Descriptor

GATT_CHRC_IFACE = "org.bluez.GattCharacteristic1"
NOTIFY_TIMEOUT = 5000

'''
def string_to_dbus_array(input_str):
    dbus_array = dbus.Array(list(dbus.Byte(byte) for byte in input_str.encode('utf-8')), signature='y')
    print("translate complete!!!")
    return dbus_array
'''


class MessageAdvertisement(Advertisement):
    def __init__(self, index):
        Advertisement.__init__(self, index, "peripheral")
        self.add_local_name("NoMatter")
        self.include_tx_power = True
    
class MessageService(Service):
    MESSAGE_SVC_UUID = "00000001-1d10-4282-b68c-e17c508b94f4"

    def __init__(self, index):
        self.msg_detail = "noMatter"
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
        
        if vals[0]=="end":
            print("sleep 20s")
            time.sleep(20)
            sys.exit(0)
        
        try:
            subprocess.run("sudo service NetworkManager start", shell=True, check=True)
            print("network manager start!")
        except subprocess.CalledProcessError as e:
            print("Error: ", e)

        try:
            subprocess.check_output(f"sudo nmcli dev wifi connect {vals[1]} password {vals[2]}", shell=True)
            print("WiFi connected")        
            value = "00000001-1d10-4282-b68c-e17c508b94f4"
            #sys.exit(0)

        except subprocess.CalledProcessError as e:
            print("Error: ", e)
            value = "fail"

        print("save value: ", value)

        #print("res: ", str(res), flush=True)

        self.service.set_msg_detail(value)
        
    def ReadValue(self, options):
        print("read value")
        value = []

        val = self.service.get_msg_detail()
        
        for c in val:
            value.append(dbus.Byte(c.encode()))

        print("ReadValue: ", value)
        
        
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
