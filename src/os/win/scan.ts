import cp from 'child_process';
import * as networkUtils from '../../util/networks';
import WinConnect from './connect';
import env from '../../util/env';

class WinScan extends WinConnect {
    public scanNetwork = (callback: IScanedList) => {
        cp.execFile(
            'netsh',
            ['wlan', 'show', 'networks', 'mode=Bssid'],
            { env },
            (err: null | object, scanResults: any): void => {
                if (err) throw err;

                // Convert raw text
                scanResults = scanResults
                    .toString('utf8')
                    .split('\r')
                    .join('')
                    .split('\n')
                    .slice(5, scanResults.length);

                let network;
                let networks = [];
                let netCount = -1;
                let line = 0;
                let netTmp;
                let netTmps = [];
                let i;

                for (i = 0; i < scanResults.length; i++) {
                    if (scanResults[i] === '') {
                        netCount++;
                        netTmp = scanResults.slice(line, i);
                        netTmps.push(netTmp);
                        line = i + 1;
                    }
                }

                for (i = 0; i < netCount; i++) {
                    // skip empty networks
                    if (netTmps[i] && netTmps[i].length > 0) {
                        network = parse(netTmps[i]);
                        networks.push(network);
                    }
                }

                // Parse text to object 
                function parse(netTmp: any) {
                    var network: any = {};

                    // Match with key
                    network.mac = netTmp[4] ? netTmp[4].match(/.*?:\s(.*)/)[1] : '';
                    network.bssid = network.mac;
                    network.ssid = netTmp[0] ? netTmp[0].match(/.*?:\s(.*)/)[1] : '';
                    network.channel = netTmp[7]
                        ? parseInt(netTmp[7].match(/.*?:\s(.*)/)[1])
                        : -1;
                    network.frequency = network.channel
                        ? parseInt(networkUtils.frequencyFromChannel(network.channel))
                        : 0;
                    network.signal_level = netTmp[5]
                        ? networkUtils.dBFromQuality(netTmp[5].match(/.*?:\s(.*)/)[1])
                        : Number.MIN_VALUE;
                    network.quality = netTmp[5]
                        ? parseFloat(netTmp[5].match(/.*?:\s(.*)/)[1])
                        : 0;
                    network.security = netTmp[2] ? netTmp[2].match(/.*?:\s(.*)/)[1] : '';
                    network.security_flags = netTmp[3]
                        ? netTmp[3].match(/.*?:\s(.*)/)[1]
                        : '';
                    network.mode = 'Unknown';
                    return network;
                }
                callback(networks);
            }
        )
    }
}

export default WinScan;

interface IScanedList {
    (scanResults: (string | number)[]): void
}
