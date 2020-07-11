# Usage

- Scan Network
```js
const networkx = require('networkx');

networkx.scanNetwork(networks => {
  consle.log(networks);
});
```

- Connect to wifi
```js
networkx.connectWifi({ ssid: 'myssid', password: 'password' });
```

- Change interface name
```js
networkx.changeInterfaceName('current_network_name', 'new_network_name');
```