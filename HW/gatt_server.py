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
        # default 설정
        self.msg_datail = "Hello World!"
        Service.__init__(self, index, self.MESSAGE_SVC_UUID, True)
        self.add_characteristic(MsgCharacteristic(self))

    # getter->(허브 메모리 에서)READ, setter->(허브 메모리 에)WRITE
    def get_msg_detail(self):
        return self.msg_detail

    def set_msg_detail(self, msg_detail):
        self.msg_detail = msg_detail

class MsgCharacteristic(Characteristic):
    MSG_CHARACTERISTIC_UUID = "00000002-1d10-4282-b68c-e17c508b94f4"

    def __init__(self, service):
        self.notifying = False

        Characteristic.__init__(
                self, self.MSG_CHARACTERISTIC_UUID,
                ["notify", "read"], service)
        self.add_descriptor(MsgDescriptor(self))

    def get_message(self):
        value = []

        msg_detail = self.service.get_msg_detail()
        print('Sending: ', msg_detail, flush=True)

        for c in msg_detail:
            value.append(dbus.Byte(c.encode()))

        return value

    def set_message_callback(self):
        if self.notifying:
            value = self.get_message()
            self.PropertiesChaged(GATT_CHRC_IFACE, {"Value": value}, [])

        return self.notifying

    def StartNotify(self):
        if self.notifying:
            return

        self.notifying = True
        print('Start notify NoMatter service', flush=True)

        value = self.get_message()
        self.PropertiesChanged(GATT_CHRC_IFACE, {"Value": value}, [])
        self.add_timeout(NOTIFY_TIMEOUT, self.set_message_callback)
    
    def StopNotify(self):
        self.notifying = False

    def ReadValue(self, options):
        value = self.get_message()

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
