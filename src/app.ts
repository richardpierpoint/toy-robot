#!/usr/bin/env node

import Controller from "./controller";
import { printMessage } from "./message";

const init = () => {

    printMessage();

    // Opt to use inquirer package instead and define questions with options.
    let stdIn = process.openStdin();
    const controller = new Controller();

    stdIn.addListener('data', (value: Buffer) => {
        const parsedValue: string = value.toString().trim().toUpperCase();
        const [command, position] = parsedValue.split(' ');
        controller.execute(command, position);
    })
}

init();