import * as net from '../util/networks';
import winUtil from '../util/win';

class UnixScan {
    public iface: any;

    public scanNetwork = (callback: any) => {
        var args = [];
        args.push('--terse');
        args.push('--fields');
        args.push(
            'active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags'
        );
        args.push('device');
        args.push('wifi');
        args.push('list');

        if (this.iface) {
            args.push('ifname');
            args.push(this.iface);
        }

        winUtil.execCommand('nmcli', args, (scanResults: any) => {
            // if (err) {
            //     callback && callback(err);
            //     return;
            // }

            var lines = scanResults.split('\n');

            var networks = [];
            for (var i = 0; i < lines.length; i++) {
                if (lines[i] != '' && lines[i].includes(':')) {
                    var fields = lines[i].replace(/\\:/g, '&&').split(':');
                    if (fields.length >= 9) {
                        networks.push({
                            ssid: fields[1].replace(/&&/g, ':'),
                            bssid: fields[2].replace(/&&/g, ':'),
                            mac: fields[2].replace(/&&/g, ':'),
                            mode: fields[3].replace(/&&/g, ':'),
                            channel: parseInt(fields[4].replace(/&&/g, ':')),
                            frequency: parseInt(fields[5].replace(/&&/g, ':')),
                            signal_level: net.dBFromQuality(
                                fields[6].replace(/&&/g, ':')
                            ),
                            quality: parseFloat(fields[6].replace(/&&/g, ':')),
                            security:
                                fields[7].replace(/&&/g, ':') != '(none)'
                                    ? fields[7].replace(/&&/g, ':')
                                    : 'none',
                            security_flags: {
                                wpa: fields[8].replace(/&&/g, ':'),
                                rsn: fields[9].replace(/&&/g, ':')
                            }
                        });
                    }
                }
            }
            callback(networks);
        })
    }
}

export default UnixScan;