import WinInterface from '../src/win';
const API = new WinInterface();
require('dotenv').config();

describe('Win32', () => {
  it('Scan Network', () => {
    API.scanNetwork((list: any) => {
      const expectedList = [
        'ssid', 'channel', 'frequency', 'signal_level', 'mac',
        'quality', 'security', 'security_flags', 'mode', 'bssid'
      ].sort();
      expect(Object.keys(list[0]).sort()).toEqual(expectedList);
    })
  })

  it('Connect to Network', () => {
    const { ssid, password }: any = process.env;
    API.connectWifi({ ssid: ssid, password: password });
  })

  it('Show Interfaces', () => {
    API.listInterfaces((list: object) => {
      expect(typeof list).toEqual('object');
    });
  })

  it('Change interface Name', () => {
    const list = API.listInterfaces();
    const ifaceName = Object.keys(list)[0];
    const tempName = 'test-iface';

    API.changeInterfaceName(ifaceName, tempName);

    const compName = API.listInterfaces();
    const newName = Object.keys(compName)[0];

    // Change name back.
    console.log('tempname', tempName);
    console.log('iface', ifaceName)

    expect(ifaceName === newName).toEqual(true);
  })

  it('Change interface Name back', () => {
    const tempName = 'test-iface';
    const original = 'Wi-Fi';

    API.changeInterfaceName(tempName, original);

    const list = API.listInterfaces();
    const ifaceName = Object.keys(list)[0];

    expect(ifaceName === original).toEqual(true);
  })
});
