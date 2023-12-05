import process from "process";
import ReadLine from "readline";

import * as cli from "./cli.js";
import * as easter from "./easter.js";

const commands: cli.CLICommand[] = [
    {
        text: `help`,
        callback: (argument) => {
            cli.printHelpMenu();
        },
    },
    {
        text: `users`,
        callback: (argument) => {
        },
    },
    {
        text: `user`,
        callback: (argument) => { },
    },
    {
        text: `add`,
        callback: (argument) => { },
    },
    {
        text: `delete`,
        callback: (argument) => { },
    },
    {
        text: `vlad`,
        callback: (argument) => {
            easter.egg(argument);
        },
    },
];

function main() {
    cli.setCommands(commands);
    cli.clearScreen();

    const command = cli.handleCLICommand(process.argv[2]);
    command.command.callback(command.arguments);

}

main();