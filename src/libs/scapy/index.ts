import pythonShell from './shell';

class NodeScapy {
    airping = (callback?: any) => {
        // Execute airping command in python script
        pythonShell({ args: ['airping'] }, (results: string[]) => {
            if (callback) callback(parse(results));
            return parse(results);
        })

        function parse(data: string[]) {
            // Filter data string
            let filtered = data.filter((d: any, i: any) => {
                if (i >= 4) return d;
            })

            // Format data object
            let formated = filtered.map((res: any) => {
                let data = res.trim().split(' ');
                return { ip: data[1], mac: data[0] };
            })

            return formated;
        }
    }

    scan = () => {
        pythonShell({ args: ['scan'] }, (err: any, results: any) => {
            if (err) throw err;

            console.log('results', results)
        })
    }
}

export default new NodeScapy;