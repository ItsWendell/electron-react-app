import { spawn, fork } from 'child_process';
import net from 'net';
import path from 'path';
import process from 'process';

import Logger from './logger';

const REACT_PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${REACT_PORT}`;
process.env.NODE_ENV = 'development';

let electronProcess;
let reactProcess;

const awaitReactApp = () => new Promise((resolve, reject) => {
    let tries = 3;
    const client = new net.Socket();
    const connectReact = () => client.connect({ port: REACT_PORT });

    client.on('connect', resolve);

    client.on('error', () => tries--);
    client.on('error', () => setTimeout(connectReact, 1000));
    client.on('error', () => (tries < 0) && reject());
    connectReact();
});


const closeChildProcess = (childProcess) => new Promise((resolve) => {
    if (!childProcess) {
        resolve();
    }

    childProcess.once('close', resolve);
    childProcess.kill();
});

function cleanExit() {
    closeChildProcess(reactProcess).then(() => {
        closeChildProcess(electronProcess).then(process.exit);
    });
}

function startReact() {
    const logger = new Logger('React App');

    // Prevent Create React App from opening a browser window. We already have one.
    process.env.BROWSER = 'none';
    reactProcess = fork('./node_modules/react-app-rewired/scripts/start.js', [], {
        silent: true,
    });

    reactProcess.on('close', () => {
        reactProcess = null;
        cleanExit();
    });

    reactProcess.stdout.on('data', data => logger.info(data));
    reactProcess.stderr.on('data', data => logger.error(data));


    reactProcess.on('message', (message) => logger.info(`Messaege: ${message.toString()}`));
}

function startElectron() {
    const logger = new Logger('Electron');

    electronProcess = spawn('electron', ['-r', 'babel-register', './src/electron/index.js']);

    electronProcess.on('close', () => {
        electronProcess = null;
        cleanExit();
    });

    electronProcess.stdout.on('data', data => logger.info(data));
    electronProcess.stderr.on('data', data => logger.error(data));

    electronProcess.on('message', (message) => logger.info(`Messaege: ${message.toString()}`));
}

process.on('exit', () => {
    cleanExit();
});

// Starts the 'react-scripts start' command
startReact();

// Wait until the server is running, then starts electron.
awaitReactApp().then(() => {
    startElectron();
});
