import pythonShell from './shell';

class NodeScapy {
    airping = (callback?: any) => {
        pythonShell({ args: ['airping'] }, (results: string[]) => {
            // Filter non data in results
            let test = results.filter((d: any, i: any) => {
                if (i >= 4) return d;
            })

            // Format data object
            test.map((res: any) => {
                let data = res.trim().split(' ');
                return { ip: data[1], mac: data[0] };
            })

            if (callback) callback(test);

            return test;
        })
    }

    scan = () => {
        pythonShell({ args: ['scan'] }, (err: any, results: any) => {
            if (err) throw err;

            console.log('results', results)
        })
    }
}

module.exports = new NodeScapy;