import process from "process";

import * as cli from "./cli.js";
import * as easter from "./easter.js";
import fs from "fs";
import { colorNames } from "chalk";
import { create } from "domain";

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
    console.log(file)
}

function writeFile(filepath: string, data: string) {
    fs.writeFileSync(filepath, data);
}

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

function getUsers() {
    return users;
}

function main() {
    // cli.clearScreen();
    cli.setCommands(commands);

    // const command = cli.handleCLICommand(
    //     (cmd, args) => {
    //         cmd.callback(args);
    //     },
    //     (cmd, args) => {
    //         cli.printCommandInvalid(cmd);
    //     }
    // );

    const user1 = newUser({
        id: "1",
        first_name: "gilad",
        last_name: "pinker",
        phonenumber: "054531"
    } as User);

    const user2 = newUser({
        id: "1",
        first_name: "gilad",
        last_name: "pinker",
        phonenumber: "054531"
    } as User);

    addUser(user1)
    addUser(user2)
    console.log(getUsers());
    const parsed = JSON.stringify(getUsers());
    writeFile("users.json", parsed);
    readFile("users.json");
}

main();