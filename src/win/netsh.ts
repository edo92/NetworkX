const os = require('os');
import winUtil from '../util/win';

class NetworkInterface {
    public changeInterfaceName = (find: string, name: string) => {
        const cmd = `netsh interface set interface name = "${find}" newname = "${name}"`;
        winUtil.execCommand(cmd, null);
    }

    public listInterfaces = () => {
        return os.networkInterfaces();
    }

    public trackNetwork = () => {
        const cmd = 'runas runas /user:Administrator "NETSH TRACE START CAPTURE=YES TRACEFILE=C:\Users\edote\OneDrive\Desktop\workdir\NetworkX"'
        winUtil.execCommand(cmd, null);
    }
};

export default NetworkInterface;