import sys
import scapy.all as scapy
import json


class Test:
    def airping(self, argv):
        return scapy.arping('192.168.1.243/24')

    def scan(self):
        # arp_request = scapy.ARP(pdst='192.168.1.243/24')
        broadcast = scapy.Ether(dist='ac:b5:7d:2a:c8:fb')
        print('testing', broadcast.summary())



export = getattr(Test(), sys.argv[1])
export(sys.argv)

# test = Test()
# test.airping('')