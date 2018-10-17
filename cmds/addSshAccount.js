#!/usr/bin/env node
const inquirer = require("inquirer");
const Fs = require('fs');
const chalk = require('chalk');
// const STORAGE_PATH = require('os').homedir() + '/sshls.json';
const STORAGE_PATH = 'sshls.json';

module.exports = () => {
    
    const createFileIfMissing = () => {
        try {
            Fs.statSync(STORAGE_PATH);
        } catch (e) {
            Fs.writeFile(STORAGE_PATH, JSON.stringify([], null, 2), function () {
            });
        }
    };

    const fetchRecords = (callback) => {
        if (!callback) {
            console.log(chalk.red('Something wrong happened.'));
            return;
        }

        Fs.readFile(STORAGE_PATH, "utf-8", function (err, content) {
            if (err) {
                console.log(chalk.red('No ssh records.'));
                return;
            }
            try {
                content = JSON.parse(content);
            } catch (e) {
                console.log(chalk.red('Failed to parse ssh records.'));
            }

            return callback(content);
        });
    };

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
        createFileIfMissing();
        let answers = await askQuestions();

        const updateRecords = (data) => {
            data.push({
                id: data[data.length - 1].id + 1,
                name: answers.name,
                connect: answers.user + '@' + answers.host,
                password: answers.password,
                user: answers.user,
                host: answers.host,
            });

            Fs.writeFile(STORAGE_PATH, JSON.stringify(data, null, 2), function () {
                console.log(chalk.green('Record stored.'));
            });
        };

        fetchRecords(updateRecords);
    };

    run();
};