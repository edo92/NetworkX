import WinScan from './scan';

class WindowsInterface extends WinScan {
    public iface: string = '';
    
    public init = (iface: string) => {
        this.iface = iface;
    }
};

export default WindowsInterface;