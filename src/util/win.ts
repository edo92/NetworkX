import cp from 'child_process';
import env from './env';

class WinHelpers {
    public static execCommand = (cmd: string, params: string[] | null, callback?: any): void => {
        new Promise((resolve, reject): void => {
            cp.execFile(cmd, params || null, { env, shell: true }, (err: any, stdout: any, stderr: any): void => {
                // Command output to error
                if (err) {
                    err.stdout = stdout;
                    err.stderr = stderr;

                    reject(err);
                } else {
                    callback(resolve(stdout));
                }
            })
        })
    };

    public static Win32Profile = (selectedAp: any, key: any) => {
        const getHexSsid = (plainTextSsid: any) => {
            var i, j, ref, hex;

            hex = '';

            for (
                i = j = 0, ref = plainTextSsid.length - 1;
                0 <= ref ? j <= ref : j >= ref;
                i = 0 <= ref ? ++j : --j
            ) {
                hex += plainTextSsid.charCodeAt(i).toString(16);
            }
            return hex;
        };

        var profile_content =
            '<?xml version="1.0"?> <WLANProfile xmlns="http://www.microsoft.com/networking/WLAN/profile/v1"> <name>' +
            selectedAp.ssid +
            '</name> <SSIDConfig> <SSID> <hex>' +
            getHexSsid(selectedAp.ssid) +
            '</hex> <name>' +
            selectedAp.ssid +
            '</name> </SSID> </SSIDConfig>';

        if (selectedAp.security.indexOf('WPA2') !== -1) {
            profile_content +=
                '<connectionType>ESS</connectionType> <connectionMode>auto</connectionMode> <autoSwitch>true</autoSwitch> <MSM> <security> <authEncryption> <authentication>WPA2PSK</authentication> <encryption>AES</encryption> <useOneX>false</useOneX> </authEncryption> <sharedKey> <keyType>passPhrase</keyType> <protected>false</protected> <keyMaterial>' +
                key +
                '</keyMaterial> </sharedKey> </security> </MSM>';
        } else if (selectedAp.security.indexOf('WPA') !== -1) {
            profile_content +=
                '<connectionType>ESS</connectionType> <connectionMode>auto</connectionMode> <autoSwitch>true</autoSwitch> <MSM> <security> <authEncryption> <authentication>WPAPSK</authentication> <encryption>TKIP</encryption> <useOneX>false</useOneX> </authEncryption> <sharedKey> <keyType>passPhrase</keyType> <protected>false</protected> <keyMaterial>' +
                key +
                '</keyMaterial> </sharedKey> </security> </MSM>';
        } else {
            if (selectedAp.security_flags.indexOf('WEP') !== -1) {
                profile_content +=
                    '<connectionType>ESS</connectionType> <connectionMode>auto</connectionMode> <autoSwitch>true</autoSwitch> <MSM> <security> <authEncryption> <authentication>open</authentication> <encryption>WEP</encryption> <useOneX>false</useOneX> </authEncryption> <sharedKey> <keyType>networkKey</keyType> <protected>false</protected> <keyMaterial>' +
                    key +
                    '</keyMaterial> </sharedKey> </security> </MSM>';
            } else {
                profile_content +=
                    '<connectionType>ESS</connectionType> <connectionMode>manual</connectionMode> <MSM> <security> <authEncryption> <authentication>open</authentication> <encryption>none</encryption> <useOneX>false</useOneX> </authEncryption> </security> </MSM>';
            }
        };

        profile_content += '</WLANProfile>';
        return profile_content;
    };
}

export default WinHelpers;