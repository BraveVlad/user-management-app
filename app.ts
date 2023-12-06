import { argv, exit } from "process";
import * as cli from "./cli.js";
import * as easter from "./easter.js";
import * as User from "./User.js";
import chalk from "chalk";
import { chownSync } from "fs";
import { userInfo } from "os";

const version = "0.5.0";
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
            read(args);
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
        text: `restore`,
        callback: (args) => {
            restore(args);
            list();
        },
    },
    {
        text: `update`,
        callback: (args) => {
            update(args);
            list();
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
            if (args[0] === "🥚") easter.egg(args);
            cli.version(version);
        },
    },
];

function update(args: cli.ArgumentsList) {
    const searchIndex = Number(args[0]);

    if (!searchIndex)
        cli.log(
            chalk.green,
            `ℹ️ Please update using user index.\n\n${chalk.bold(
                "update [user_id] [field] [value]"
            )}\n`
        );

    const user = User.getUsers()[searchIndex];

    if (!user) {
        cli.log(
            chalk.red,
            chalk.bold(
                `⚠️  Couldn't find user with id ${chalk.underline(searchIndex)}\n`
            )
        );
        exit();
    }

    const key = User.isEditableUserKey(args[1]);
    const value = args[2];

    if (key) {
        User.update(user, key, value);
        User.saveUsers();

        cli.log(
            chalk.green,
            chalk.bold(
                `✅ Successfuly changed '${args[1]}' to '${value}' for user ${user.first_name + " " + user.last_name
                } id: ${user.id}\n`
            )
        );
        list();
        exit();
    } else {
        cli.log(
            chalk.red,
            chalk.bold(`⚠️  Sorry, you can not change '${args[1]}' of any user \n`)
        );
        exit()
        exit();
    }

}

function list() {
    cli.printUsersList(User.getUsers());
}

function read(args: cli.ArgumentsList) {
    const userId = args[0];
    console.log("printing user", userId);
    console.log(User.getUserById(args[0]));
}

function deleteUser(args: cli.ArgumentsList) {
    const userId = args[0];
    const user = User.getUserById(userId);

    if (userId === "all") {

        User.getUsers().forEach(user => User.deleteUserById(user.id))
        User.saveUsers()
        cli.log(
            chalk.green,
            chalk.bold(
                `♻️ ✅ Successfuly deleted ${chalk.bgGreenBright(`all`)} users!
                \n\n`)
        );
        list();
        exit();
    }

    if (!user) {
        cli.log(
            chalk.red,
            chalk.bold(
                `🗑️ ⚠️  Sorry, couldn't find user with id '${userId}' to delete \n\n`
            )
        );
        list();
        exit();
    }

    if (user.soft_deleted) {
        cli.log(
            chalk.green,
            chalk.bold(`🗑️ ✅ User id '${userId}' is already deleted`)
        );
        list();
        exit();
    }

    User.deleteUserById(userId);
    User.saveUsers();

    cli.log(
        chalk.green,
        chalk.bold(
            `🗑️ ✅ Successfuly deleted ${user.first_name + " " + user.last_name} id: ${user.id
            }\n\n`
        )
    );
}

function restore(args: cli.ArgumentsList) {
    const userId = args[0];

    if (userId === "all") {

        User.getUsers().forEach(user => User.restoreUserById(user.id))
        User.saveUsers()
        cli.log(
            chalk.green,
            chalk.bold(
                `♻️ ✅ Successfuly restored ${chalk.bgGreenBright(`all`)} users!
                \n\n`)
        );
        list();
        exit();
    }
    const user = User.getUserById(userId);

    if (!user) {
        list();
        exit();
    }

    if (!user.soft_deleted) {
        cli.log(
            chalk.green,
            chalk.bold(`♻️ ✅ User id '${userId}' is already active`)
        );
        list();
        exit();
    }

    User.restoreUserById(userId);
    User.saveUsers();
    cli.log(
        chalk.green,
        chalk.bold(
            `♻️ ✅ Successfuly restored ${user.first_name + " " + user.last_name} id: ${user.id
            } \n\n`
        )
    );
}

function create(args: cli.ArgumentsList) {
    const user = User.newUser({
        id: User.generateId(),
        first_name: args[0],
        last_name: args[1],
        phonenumber: args[2],
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
            cmd.callback(args);
        },
        (rawCmd, args) => {
            cli.printCommandInvalid(rawCmd);
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
        phonenumber: "054531",
    } as User.User);

    const user2 = User.newUser({
        id: "2",
        first_name: "gilad",
        last_name: "pinker",
        phonenumber: "054531",
    } as User.User);

    User.addUser(user1);
    User.addUser(user2);
    User.saveUsers();
}
