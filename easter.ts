
import chalk from "chalk";
import { exit } from "process";
import { ArgumentsList } from "./cli.js";

type BetterBeAnEgg = ArgumentsList;

export function egg(args: BetterBeAnEgg) {
    if (args[0] !== `🥚`) exit();

    console.log(chalk.blue(
        `
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙███∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙███∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙███∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙█████████████∙∙∙∙∙
    ∙∙∙∙∙█████∙∙∙∙∙∙∙∙███∙∙∙███∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙█████████████∙∙∙∙∙
    ∙∙∙∙∙█████∙∙∙∙∙∙∙∙███∙∙∙███∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙████∙∙∙∙∙∙∙████∙∙∙
    ∙∙∙∙∙█████∙∙∙∙∙∙∙∙███∙∙∙███∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙████∙∙∙∙∙∙∙████∙∙∙
    ∙∙∙∙∙█████∙∙∙∙∙∙∙∙███∙∙∙███∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙████∙∙∙∙∙∙∙████∙∙∙
    ∙∙∙∙∙█████∙∙∙∙∙∙∙∙███∙∙∙███∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙████∙∙∙∙∙∙∙████∙∙∙
    ∙∙∙∙∙█████∙∙∙∙∙∙∙∙███∙∙∙███∙∙∙∙∙∙∙∙∙∙∙∙♥♥∙∙∙████∙∙∙∙∙∙∙████∙∙∙
    ∙∙∙∙∙█████∙∙∙∙∙∙∙∙███∙∙∙███∙∙∙∙♥♥♥♥♥♥♥∙♥♥∙∙∙████∙∙∙∙∙∙∙████∙∙∙
    ∙∙∙∙∙█████∙∙∙∙∙∙∙∙███∙∙∙███∙♥♥♥♥♥♥♥♥♥♥♥♥♥∙∙∙████∙∙∙∙∙∙∙████∙∙∙
    ∙∙∙∙∙█████∙∙∙∙∙∙∙∙███∙∙∙███∙♥♥♥∙∙∙∙∙∙∙♥♥♥∙∙∙████∙∙∙∙∙∙∙████∙∙∙
    ∙∙∙∙∙█████∙∙∙∙∙∙∙∙███∙∙∙███∙♥♥♥∙∙∙∙∙∙∙♥♥♥∙∙∙████∙∙∙∙∙∙∙████∙∙∙
    ∙∙∙∙∙█████∙∙∙∙∙∙∙∙███∙∙∙███∙♥♥♥∙∙∙∙∙∙∙♥♥♥∙∙∙████∙∙∙∙∙∙∙████∙∙∙
    ∙∙∙∙∙█████∙∙∙∙∙∙∙∙███∙∙∙███∙♥♥♥∙∙∙∙∙∙∙♥♥♥∙∙∙████∙∙∙∙∙∙∙████∙∙∙
    ∙∙∙∙∙████████████████∙∙∙███∙♥♥♥♥♥♥♥♥♥♥♥♥♥∙∙∙███████████∙∙∙∙∙∙∙
    ∙∙∙∙∙███████████████∙∙∙∙███∙∙∙∙♥♥♥♥♥♥♥∙∙♥♥∙∙███████████∙∙∙∙∙∙∙
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
    
    ∙∙∙∙∙∙∙∙∙∙∙∙∙ Made with ❤️‍🔥  by Gilad V. Pinker ∙∙∙∙∙∙∙∙∙∙∙∙∙∙  
    ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙`
    ));

    exit();
}