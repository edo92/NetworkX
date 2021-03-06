const os = require('os');
import winUtil from '../../util/win';
import ScapyMiddleware from './scapy';

class NetworkInterface extends ScapyMiddleware {
    public changeInterfaceName = (find: string, name: string) => {
        const cmd = `netsh interface set interface name = "${find}" newname = "${name}"`;
        return winUtil.execCommand(cmd, null);
    }

    public listInterfaces = (callback?: any) => {
        const list = os.networkInterfaces();
        if (callback) callback(list);
        return list;
    }
    
    public trackNetwork = () => { // Need attenction
        const cmd = 'runas runas /user:Administrator "NETSH TRACE START CAPTURE=YES TRACEFILE=C:\Users\edote\OneDrive\Desktop\workdir\NetworkX"'
        winUtil.execCommand(cmd, null);
    }
};

export default NetworkInterface;
