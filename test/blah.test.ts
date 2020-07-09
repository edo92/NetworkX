import WinInterface from '../src/win';
const API = new WinInterface();
require('dotenv').config();

describe('Scan', () => {
  it('Networks', () => {
    API.scanNetwork((list: any) => {
      const expectedList = [
        'ssid', 'channel', 'frequency', 'signal_level', 'mac',
        'quality', 'security', 'security_flags', 'mode', 'bssid'
      ].sort();
      expect(Object.keys(list[0]).sort()).toEqual(expectedList);
    })
  })

  it('Devices', () => {
    const { ssid, password }: any = process.env;
    API.connectWifi({ ssid: ssid, password: password });
  })
});
