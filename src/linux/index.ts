import LinuxScan from './scan';

class LinuxInterface extends LinuxScan {
    constructor(){
        super()
        this.iface = ''
    }

    public init = (config:any) => {
        this.iface = config.iface;
    }
};

export default LinuxInterface;