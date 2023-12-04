import process from "process";
import ReadLine from "readline";

import chalk from "chalk";

const cliCommand = process.argv[2];

console.log(`Welcome to Vlad's User-Management app!`);
console.log(
    chalk.blue(`test The command recieved is: `),
    chalk.red(cliCommand)
);

type OnValidCLICommandListener = (argument: string) => void;

type CLICommand = {
    text: string;
    callback: OnValidCLICommandListener;
};

const commands: CLICommand[] = [
    {
        text: `test`,
        callback: (argument) => {
            console.log(`test was detected`);
            console.log(`command argument is ${argument}`);
        },
    },
    {
        text: `test`,
        callback: (argument) => {
            console.log(`test was detected`);
            console.log(`command argument is ${argument}`);
        },
    },
    {
        text: `test`,
        callback: (argument) => {
            console.log(`test was detected`);
            console.log(`command argument is ${argument}`);
        },
    },
];

function cliCommandNotValid(invalidCommand: string) {
    console.log(
        chalk.red(`Command `),
        chalk.bgRedBright(chalk.redBright(invalidCommand)),
        chalk.red(` is not a valid command.`)
    );
    console.log(`use`, chalk.blue(`help`), `for commands menu\n\n`);
}

function handleCLICommand(rawCommand: string) {
    try {
        const command = validateCLICommand(rawCommand);
        command.callback(process.argv[3]);
    } catch {
        cliCommandNotValid(rawCommand);
    }
}

function validateCLICommand(rawCommand: string): CLICommand {
    const command = findCommand(rawCommand);
    if (!command) throw new Error(`Command ${rawCommand} is invald`);

    return command;
}

function findCommand(command: string): CLICommand | undefined {
    return commands.find((matchedCommand) => matchedCommand.text === command);
}


handleCLICommand(process.argv[2]);