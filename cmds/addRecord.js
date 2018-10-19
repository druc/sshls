#!/usr/bin/env node
const inquirer = require("inquirer");
const Fs = require('fs');
const chalk = require('chalk');
const common = require('../common');

module.exports = () => {
    const askQuestions = () => {
        const questions = [
            {
                name: "name",
                type: "input",
                message: "Give it a name:"
            },
            {
                name: "user",
                type: "input",
                message: "Enter user:"
            },
            {
                name: "host",
                type: "input",
                message: "Enter host:"
            },
            {
                name: "password",
                type: "input",
                message: "Enter password:"
            }
        ];

        return inquirer.prompt(questions);
    };

    const run = async () => {
        let answers = await askQuestions();

        const updateRecords = (data) => {
            data.push({
                number: data.length ? data[data.length - 1].number + 1 : 1,
                name: answers.name,
                connect: answers.user + '@' + answers.host,
                password: answers.password,
                user: answers.user,
                host: answers.host,
            });

            Fs.writeFile(common().getStoragePath(), JSON.stringify(data, null, 2), function () {
                console.log(chalk.green('Record stored.'));
            });
        };

        common().getRecords(updateRecords);
    };

    run();
};