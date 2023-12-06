import process from "process";

import * as cli from "./cli.js";
import * as easter from "./easter.js";
import fs from "fs";
import { colorNames } from "chalk";
import { create } from "domain";
import { error } from "console";

const commands: cli.CLICommand[] = [
    {
        text: `help`,
        callback: (argument) => {
            cli.printHelpMenu();
        },
    },
    {
        text: `users`,
        callback: (argument) => { },
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

// define user
// file read
// file create
// create file with json format
// get file as objects of type X list 
// save list 
// save only object in list (save line? iterate untill found object id?)

function readFile(filepath: string) {
    const file = fs.readFileSync(filepath, "utf-8");

    if (!file) throw new Error(`failed to read file ${filepath}`);

    return file;
}

function writeFile(filepath: string, data: string) {
    fs.writeFileSync(filepath, data);
}

const FILEPATH_STORAGE_USERS = 'users.json';

type Users = User[];
type User = {
    id: string,
    first_name: string,
    last_name: string,
    phonenumber: string
    soft_delete_date: number,
    soft_deleted: boolean
}
const users: Users = [];


function newUser(newUser: Omit<User, 'soft_delete_date' | 'soft_delete'>): User {
    return {
        ...newUser,
        soft_delete_date: -1,
        soft_deleted: false
    } as User;
}

function addUser(user: User) {
    users.push(user);
}

function setUsers(newUsers: Users) {
    users.splice(0);
    newUsers.forEach(user => users.push(user));
}

function getUsers() {
    return [...users];
}

function getUserById(users: Users, id: string) {
    return users.find(user => user.id === id);
}

function saveUsers(filepath: string, users: Users) {
    const serializedUsers = JSON.stringify(users);

    writeFile(filepath, serializedUsers)
}

function loadUsers(filepath: string): Users {
    try {
        const file = readFile(filepath);
        const parsedUsers = JSON.parse(file) as Users;

        if (!parsedUsers) throw new Error(`Unable to parse users from ${filepath}`)

        return parsedUsers;

    } catch {
        console.log("Failed to read users");
        throw new Error(`Unable to load users from file ${filepath}`);
    }
}

function main() {
    cli.clearScreen();
    cli.setCommands(commands);

    // const command = cli.handleCLICommand(
    //     (cmd, args) => {
    //         cmd.callback(args);
    //     },
    //     (cmd, args) => {
    //         cli.printCommandInvalid(cmd);
    //     }
    // );

    // const user1 = newUser({
    //     id: "1",
    //     first_name: "gilad",
    //     last_name: "pinker",
    //     phonenumber: "054531"
    // } as User);

    // const user2 = newUser({
    //     id: "1",
    //     first_name: "gilad",
    //     last_name: "pinker",
    //     phonenumber: "054531"
    // } as User);

    // addUser(user1)
    // addUser(user2)

    setUsers(loadUsers(FILEPATH_STORAGE_USERS));
    const user = getUserById(getUsers(), "2");
    console.log(user);

}

main();