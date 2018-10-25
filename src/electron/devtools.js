/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

import { app } from 'electron';
import electronDebug from 'electron-debug';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

const registerDevTools = () => {
    electronDebug({
        showDevTools: 'undocked',
    });

    // Install React Developer Tools
    app.on('ready', () => {
        installExtension(REACT_DEVELOPER_TOOLS)
            .then(() => { })
            .catch(err => {
                console.log('Unable to install `react-devtools`: \n', err)
            });
    });
};

export default registerDevTools;
