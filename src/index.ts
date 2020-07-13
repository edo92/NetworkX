// import WindowsInterface from './win';

// let imp = new WindowsInterface();
// // console.log(imp.changeInterfaceName('test-iface', 'Wi-Fi'));



import LinuxInterface from './linux';

let imp = new LinuxInterface();

console.log('imppp', imp.scanNetwork((res: any) => {
    console.log('response', res)
}))