import WindowsInterface from './os/win';

let imp = new WindowsInterface();
// console.log(imp.discoverDevices((res: any) => {
//     console.log('response', res)
// }));
console.log(imp.deauth())


// import LinuxInterface from './linux';

// let imp = new LinuxInterface();

// console.log('imppp', imp.scanNetwork((res: any) => {
//     console.log('response', res)
// }))