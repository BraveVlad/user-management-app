import { argv, exit } from "process";
import * as cli from "./cli.js";
import * as easter from "./easter.js";
import * as User from "./User.js";
import chalk from "chalk";
import { chownSync } from "fs";

const version = '0.4.0'
const commands: cli.CLICommand[] = [

    {
        text: `help`,
        callback: (args) => {
            cli.printHelpMenu();
        },
    },
    {
        text: `help`,
        callback: (args) => {
            cli.printHelpMenu();
        },
    },
    {
        text: `list`,
        callback: (args) => {
            list();
        },
    },
    {
        text: `read`,
        callback: (args) => {
            read(args)
        },
    },
    {
        text: `create`,
        callback: (args) => {
            create(args);
            list();
        },
    },
    {
        text: `delete`,
        callback: (args) => {
            deleteUser(args);
            list();
        },
    },
    {
        text: `update`,
        callback: (args) => {
            update(args);
        },
    },
    {
        text: `vlad`,
        callback: (args) => {
            easter.egg(args);
        },
    },
    {
        text: `version`,
        callback: (args) => {
            if (args[0] === '🥚') easter.egg(args);
            cli.version(version);
        },
    }
];

function update(args: cli.ArgumentsList) {

    const searchIndex = Number(args[0]);

    if (!searchIndex) cli.log(chalk.green, `ℹ️ Please update using user index.\n\n${chalk.bold('update [user_id] [field] [value]')}\n`)

    const user = User.getUsers()[searchIndex];

    if (!user) {
        cli.log(chalk.red, chalk.bold(`⚠️  Couldn't find user with id ${chalk.underline(searchIndex)}\n\n`))
        exit()
    }
    // const targetKey = args[1];
    // console.log(targetKey)
    // console.log(`is key of user`, isKeyOfUser(targetKey))
    // console.log(`is key editable`, isUserKeyEditable(targetKey) as boolean)
    // if (isKeyOfUser(targetKey) && isUserKeyEditable(targetKey)) {
    //     user[targetKey] = args[2];
    //     User.saveUsers()
    // } else {
    //     cli.log(chalk.red, chalk.bold(`⚠️  Sorry, you can not change '${targetKey}' of any user \n\n`))
    //     exit()
    // }

    const key = args[1];
    const value = args[2];

    if (isEditableUserKey(key)) {
        user[key as EditableUserKey] = value;
    } else {
        cli.log(chalk.red, chalk.bold(`⚠️  Sorry, you can not change '${key}' of any user \n\n`))
    }

    list();

}
type EditableUserKey = "phonenumber" | "first_name" | "last_name";

function isEditableUserKey(key: string) {
    return ['first_name', 'last_name', 'phonenumber'].includes(key) ? key as EditableUserKey : undefined;
}

function list() {
    cli.printUsersList(User.getUsers());
}

function read(args: cli.ArgumentsList) {
    const userId = args[0];
    console.log("printing user", userId)
    console.log(User.getUserById(args[0]))
}

function deleteUser(args: cli.ArgumentsList) {
    const userId = args[0];
    console.log("deleting user", userId)
    User.deleteUserById(userId);
    User.saveUsers();
}

function restoreUser(args: cli.ArgumentsList) {
    const userId = args[0];

}
function create(args: cli.ArgumentsList) {
    const user = User.newUser({
        id: User.generateId(),
        first_name: args[0],
        last_name: args[1],
        phonenumber: args[2]
    } as User.User);
    User.addUser(user);
    User.saveUsers();
}

function main() {
    cli.clearScreen();
    cli.greet();
    cli.setCommands(commands);

    try {
        User.setUsers(User.loadUsers());
    } catch {
        User.setUsers([]);
        User.saveUsers();
    }

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
        id: "2",
        first_name: "gilad",
        last_name: "pinker",
        phonenumber: "054531"
    } as User.User);

    User.addUser(user1)
    User.addUser(user2)
    User.saveUsers()
}