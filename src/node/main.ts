const express = require("express");
import {Request, Response} from 'express';
import { app, BrowserWindow } from 'electron';
import { AddressInfo } from "net";

// const Request = express.Request;
// const Response = express.Response;

/**
 * Use port as ZERO so that OS gives a port to use.
 */
const PORT = 0;

const server = express();

function create_local_application(port: number) {
    const win = new BrowserWindow();
    
    win.loadURL(`http://localhost:${port}/index.html`);
}

server.get('/', (req: Request, res: Response) => {
    res.send("Invalid page!");
    console.log("No page specified");
})

server.get('/index.html', (req: Request, res: Response) => {
    res.send("Index page");
});

const listener = server.listen(PORT, () => {
    const address_info = listener.address() as AddressInfo;
    app.whenReady().then(() => {

        console.log("Aplication:", address_info.port);
        create_local_application(address_info.port);
    })
});
