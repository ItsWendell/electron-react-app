import chalk from 'chalk';

class Logger {
    constructor(header) {
        this.header = header;
    }

    write(data, color = 'yellow') {
        let output = '';
        data = data.toString().split(/\r?\n/)
        data.forEach(line => {
            output += `  ${line}\n`
        })
        if (/[0-9A-z]+/.test(output)) {
            console.log(
                chalk[color].bold(`[ ${this.header} ] -------------------`) +
                '\n\n' +
                output.replace(/^\s+|\s+$/g, ''),
                '\n',
            );
        }
    }

    info(data) {
        this.write(data, 'yellow');
    }

    error(data) {
        this.write(data, 'red');
    }
}

export default Logger;