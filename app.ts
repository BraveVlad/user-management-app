import process from "process";

import * as cli from "./cli.js";
import * as easter from "./easter.js";
import * as User from "./User.js";

const commands: cli.CLICommand[] = [
    {
        text: `help`,
        callback: (argument) => {
            cli.printHelpMenu();
        },
    },
    {
        text: `list`,
        callback: (argument) => {
            list();
        },
    },
    {
        text: `read`,
        callback: (argument) => { },
    },
    {
        text: `create`,
        callback: (argument) => { },
    },
    {
        text: `delete`,
        callback: (argument) => { },
    },
    {
        text: `update`,
        callback: (argument) => { },
    },
    {
        text: `vlad`,
        callback: (argument) => {
            easter.egg(argument);
        },
    },
];

function list() {
    cli.printUsersList(User.getUsers());
}

function main() {
    cli.clearScreen();
    cli.greet();
    cli.setCommands(commands);
    User.setUsers(User.loadUsers());

    cli.handleCLICommand(
        (cmd, args) => {
            cmd.callback(args)
        },
        (rawCmd, args) => {
            cli.printCommandInvalid(rawCmd)
        }
    );


}

main();

function DEBUG_generateUsers() {
    const command = cli.handleCLICommand(
        (cmd, args) => {
            cmd.callback(args);
        },
        (cmd, args) => {
            cli.printCommandInvalid(cmd);
        }
    );

    const user1 = User.newUser({
        id: "1",
        first_name: "gilad",
        last_name: "pinker",
        phonenumber: "054531"
    } as User.User);

    const user2 = User.newUser({
        id: "1",
        first_name: "gilad",
        last_name: "pinker",
        phonenumber: "054531"
    } as User.User);

    User.addUser(user1)
    User.addUser(user2)
    User.saveUsers(User.getUsers())
}