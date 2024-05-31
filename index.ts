#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

// Display the main heading with figlet and chalk
console.log(chalk.green(figlet.textSync("Contact Menu", {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
})));

console.log(chalk.yellowBright("Welcome to Contact Numbers Menu"));

// Define type of array
type ContactType = { ID: number, Name: string, PhoneNo: number };
let contacts: ContactType[] = [];
let contactsSerialNo = 1;

async function contactMenuInput() {
    const inputContact = await inquirer.prompt({
        type: 'list',
        name: 'contact',
        message: "Select your option",
        choices: ["Add Contact", "View Contacts", "Close Menu"]
    });

    let { contact } = inputContact;  // Destructuring

    if (contact === "Add Contact") addContact();
    if (contact === "View Contacts") viewContact();
    if (contact === "Close Menu") {
        console.log(chalk.magentaBright(`\nThank You for using contact menu!`));
        process.exit(0);  // Exit the process to stop further input
    }
}

contactMenuInput();

async function addContact() {
    const inputContactDetails = await inquirer.prompt([
        {
            type: 'input',
            name: 'personName',
            message: chalk.blueBright(`Enter Person Name!`)
        },
        {
            type: 'number',
            name: 'phoneNumber',
            message: chalk.blueBright(`Enter Contact Number!`)
        }
    ]);

    const { personName, phoneNumber } = inputContactDetails;  // Destructuring

    contacts.push({ ID: contactsSerialNo++, Name: personName, PhoneNo: phoneNumber });
    console.log(chalk.greenBright.bold(`\nNew Contact number has been added\n`));
    contactMenuInput();
}

function viewContact() {
    if (contacts.length > 0) {
        contacts.forEach((user) =>
            console.log(chalk.green(`\n${user.ID}. Person Name: ${chalk.cyan(user.Name)} ---- Contact Number: ${chalk.yellow(user.PhoneNo)}\n`))
        );
    } else {
        console.log(chalk.red(`\nNo Contacts available!`));
    }
    contactMenuInput();
}
