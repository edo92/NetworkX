import WindowsInterface from './win';

let imp = new WindowsInterface();

// console.log(imp.changeInterfaceName('test-iface', 'Wi-Fi'));
// console.log(imp.changeInterfaceName('test-iface', 'Wi-Fi'));

imp.scanLocalDevices((data: any) => {
    console.log('----', data)
})

// console.log('imp', imp.listInterfaces())