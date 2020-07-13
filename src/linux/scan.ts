class UnixScan {
    public scanNetwork = () => {
        var args = [];
        args.push('--terse');
        args.push('--fields');
        args.push(
            'active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags'
        );
        args.push('device');
        args.push('wifi');
        args.push('list');

        if (config.iface) {
            args.push('ifname');
            args.push(config.iface);
        }
    }
}

export default UnixScan;