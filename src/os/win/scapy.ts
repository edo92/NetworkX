import scapy from '../../libs/scapy';

class ScapyMiddleware {
    public discoverDevices = (callback: any) => {
        // Use scay to get local devices
        scapy.airping((res: any) => {
            callback(res);
        })
    }

    public deauth = () => {
        scapy.scan();
    }
}

export default ScapyMiddleware;