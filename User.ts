import { randomUUID } from "crypto";
import { readFile, writeFile } from "./vladio.js";

const FILEPATH_STORAGE_USERS = 'users.json';

export type Users = User[];
export type User = {
    id: string,
    first_name: string,
    last_name: string,
    phonenumber: string
    soft_delete_date: number,
    soft_deleted: boolean
}

const users: Users = [];

export function newUser(newUser: Omit<User, 'soft_delete_date' | 'soft_delete'>): User {
    return {
        ...newUser,
        soft_delete_date: -1,
        soft_deleted: false
    } as User;
}

export function generateId() {
    return users.length.toString();
}

export function addUser(user: User) {
    users.push(user);
}

export function setUsers(newUsers: Users) {
    users.splice(0);
    newUsers.forEach(user => users.push(user));
}

export function convertDeletionDate(date: number) {
    return new Date(date).toUTCString();
}

export function deleteUserById(id: string) {
    const user = getUserById(id);

    if (!user) throw new Error(`Couldnt find user with id ${id} to delete`);

    user.soft_delete_date = Date.now();
    user.soft_deleted = true;
}

export function getUsers() {
    return [...users];
}

export function getDeletedUsers() {
    return [...users.filter((user) => user.soft_deleted)]
}
export function getUserById(id: string) {
    return users.find(user => user.id === id);
}

export function saveUsers() {
    const serializedUsers = JSON.stringify(getUsers());

    writeFile(FILEPATH_STORAGE_USERS, serializedUsers)
}

export function loadUsers(): Users {
    try {
        const file = readFile(FILEPATH_STORAGE_USERS);
        const parsedUsers = JSON.parse(file) as Users;

        if (!parsedUsers) throw new Error(`Unable to parse users from ${FILEPATH_STORAGE_USERS}`)

        return parsedUsers;

    } catch {
        throw new Error(`Unable to load users from file ${FILEPATH_STORAGE_USERS}`);
    }
}