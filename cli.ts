import chalk, { ChalkInstance, colorNames } from "chalk";
import { exit } from "process";
import { User, Users, convertDeletionDate, getDeletedUsers } from "./User.js";

type OnValidCLICommandListener = (argument: ArgumentsList) => void;

export type ArgumentsList = string[];

export type CLICommand = {
    text: string;
    callback: OnValidCLICommandListener;
};

type Commands = CLICommand[];
const commands: Commands = [];

export function renderUser(user: User) {
    const painter = user.soft_deleted ? chalk.dim : chalk;
    const deletedLine = !user.soft_deleted
        ? ""
        : `🗑️ ${chalk.bold(painter.red(convertDeletionDate(user.soft_delete_date)))}
        `;

    return painter(`
----------------- ${painter.yellow(user.id)} --------------------       

            ${chalk.whiteBright(
        painter.underline(user.first_name, user.last_name))}                       

           📞 ${painter.cyan(user.phonenumber)}
    ${deletedLine}`);
}

export function printUsersList(users: Users) {
    const arhivedUsers = getDeletedUsers().length;

    console.log(`
████████████  Phonebook  ███████████████    
█                                      █
              Total: ${chalk.bold(chalk.blue(users.length))}    
        Active: ${chalk.greenBright(
        users.length - arhivedUsers
    )} Archived: ${chalk.redBright(arhivedUsers)}           
    ${users.map(renderUser).join(``)}
█                                      █ 
████████████████████████████████████████
`);
}

export function setCommands(newCommands: Commands) {
    commands.splice(0);
    newCommands.forEach((command) => {
        commands.push(command);
    });
}

export function printHelpMenu() {
    const rgbMax = 255;
    console.log(chalk.yellow(`Available commands: \n`));
    for (const i in commands) {
        const menuChalk = chalk.rgb(
            rgbMax - 42 * Number(i),
            rgbMax - 42 * Number(i),
            rgbMax - 42 * Number(i)
        );
        const selectedChalk = chalk.yellow;

        if (Number(process.argv[3]) === Number(i) + 1)
            console.log(selectedChalk(Number(i) + 1, `)`, `${commands[i].text} `));
        else console.log(menuChalk(Number(i) + 1, `)`), `${commands[i].text} `);
    }
    console.log("\n");
}

export function clearScreen() {
    console.clear();
}

export function greet() {
    console.log(chalk.bgCyan(`${chalk.blue("         Vlad's Users CRUD App        ")} \n`));
}

export function printCommandInvalid(invalidCommand: string) {
    console.log(
        chalk.red(`⚠️  Command `),
        chalk.bgRedBright(chalk.redBright(invalidCommand)),
        chalk.red(` is not a valid command.`)
    );
    console.log(`use`, chalk.blue(`help`), `for commands menu\n\n`);
}
type OnValidCommandCallback = (
    command: CLICommand,
    args: ArgumentsList
) => void;
type OnInvalidCommandCallback = (command: string, args: ArgumentsList) => void;

export function handleCLICommand(
    success: OnValidCommandCallback,
    fail: OnInvalidCommandCallback
) {
    const rawCommand = process.argv[2];
    const command = findCommand(rawCommand);

    if (!command) fail(rawCommand, process.argv.splice(3));
    else success(command, process.argv.splice(3));
}

function findCommand(command: string): CLICommand | undefined {
    return commands.find((matchedCommand) => matchedCommand.text === command);
}

// type ColorPrimary = ''
// type ColorSecondary = ''
// type ColorMark
//  = ''
export function log(painter: ChalkInstance, ...text: any[]) {
    console.log(painter(...text))
}

export function version(version: string) {
    log(chalk.bgYellow, "                                       ")
    log(chalk.bgYellow, "                                       ")
    log(chalk.bgYellow, "                                       ")
    log(chalk.bgYellow, "                                       ")
    log(chalk.bgYellow, "                                       ")
    log(chalk.bgYellow, "                                       ")
    log(chalk.bgYellow, "                                       ")
    log(chalk.bgYellow, chalk.bold("               ", version, "                 "))
    log(chalk.bgYellow, "                                       ")
    log(chalk.bgYellow, "                                       ")
    log(chalk.bgYellow, "                                       ")
    log(chalk.bgYellow, "                                       ")
    log(chalk.bgYellow, "                                       ")
    log(chalk.bgYellow, "                                       ")
    log(chalk.bgYellow, "                                       ")
    log(chalk.white, "\nhttps://github.com/BraveVlad/users-crud")
    log(chalk.red, "\n    https://github.com/BraveVlad\n")
}