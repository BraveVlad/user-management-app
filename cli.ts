import chalk, { colorNames } from "chalk";
import { exit } from "process";

type OnValidCLICommandListener = (argument: ArgumentsList) => void;

export type ArgumentsList = string[];

export type CLICommand = {
    text: string;
    callback: OnValidCLICommandListener;
};

type Commands = CLICommand[];
const commands: Commands = [];

export function setCommands(newCommands: Commands) {
    commands.splice(0);
    newCommands.forEach(command => {
        commands.push(command);
    });
}

export function printHelpMenu() {
    const rgbMax = 255;
    console.log(chalk.yellow(`Available commands:\n`));
    for (const i in commands) {
        const menuChalk = chalk.rgb(
            rgbMax - 42 * Number(i),
            rgbMax - 42 * Number(i),
            rgbMax - 42 * Number(i)
        );
        const selectedChalk = chalk.yellow;

        if (Number(process.argv[3]) === Number(i) + 1)
            console.log(selectedChalk(Number(i) + 1, `)`, `${commands[i].text}`));
        else console.log(menuChalk(Number(i) + 1, `)`), `${commands[i].text}`);
    }
    console.log("\n");
}

export function clearScreen() {
    console.clear();
}

export function greet() {
    console.log(
        chalk.bgCyan(` ${chalk.blue("Vlad's User Management App")}         `)
    );
}

export function printCommandInvalid(invalidCommand: string) {
    console.log(
        chalk.red(`⚠️  Command `),
        chalk.bgRedBright(chalk.redBright(invalidCommand)),
        chalk.red(` is not a valid command.`)
    );
    console.log(`use`, chalk.blue(`help`), `for commands menu\n\n`);
}
type OnValidCommandCallback = (command: CLICommand, args: ArgumentsList) => void;
type OnInvalidCommandCallback = (command: string, args: ArgumentsList) => void;

export function handleCLICommand(success: OnValidCommandCallback, fail: OnInvalidCommandCallback) {
    const rawCommand = process.argv[2];
    const command = findCommand(rawCommand);

    if (!command) fail(rawCommand, process.argv.splice(3));
    else success(command, process.argv.splice(3));
}

function findCommand(command: string): CLICommand | undefined {
    return commands.find((matchedCommand) => matchedCommand.text === command);
}
