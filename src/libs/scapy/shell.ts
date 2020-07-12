import { PythonShell } from 'python-shell';

export default (confOps: object, callback: any) => {
    let defOpts = {
        // pythonOptions: ['-u'],
        scriptPath: `${__dirname}/py_scripts`,
        file: 'main.py',
    }

    let options = { ...confOps, ...defOpts };

    PythonShell.run(options.file, options, (err: any, results: any): void => {
        if (err) throw err;
        callback(results);
    })
}