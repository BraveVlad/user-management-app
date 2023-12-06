import fs from "fs";

export function readFile(filepath: string) {
    const file = fs.readFileSync(filepath, "utf-8");

    if (!file) throw new Error(`failed to read file ${filepath}`);

    return file;
}

export function writeFile(filepath: string, data: string) {
    fs.writeFileSync(filepath, data);
}
