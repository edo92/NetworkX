import LinuxScan from './scan';

class LinuxInterface extends LinuxScan {
    public iface: string = '';

    public init = (iface: string) => {
        this.iface = iface;
    }
};

export default LinuxInterface;