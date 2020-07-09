import fs from 'fs';

import NetworkInterface from './netsh';
import winUtil from '../util/win';

class WinConnect extends NetworkInterface {
    public scanNetwork: any;

    public connectWifi = (cridential: Icredentials): void => {
        if (!cridential.ssid) {
            throw 'SSID is missing'
        }

        if (!cridential.password) {
            throw 'Password is missing';
        }

        this.scanNetwork((networks: (string | number)[]): void => {
            let targetNet = networks.find((target: any) => {
                return target.ssid === cridential.ssid;
            })

            if (!targetNet) {
                throw 'Network was not found';
            }

            // Create network profile
            fs.writeFileSync(
                'nodeWifiConnect.xml',
                winUtil.Win32Profile(targetNet, cridential.password)
            )

            // Connect command with netsh
            winUtil.execCommand('netsh', [
                'wlan',
                'add',
                'profile',
                'filename="nodeWifiConnect.xml"'
            ])
        })
    };
};

export default WinConnect;

interface Icredentials {
    ssid: string;
    password: string
}

