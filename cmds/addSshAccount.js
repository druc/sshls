#!/usr/bin/env node
const inquirer = require("inquirer");
const Fs = require('fs');
const chalk = require('chalk');

module.exports = () => {
    let SSHLS = [];
    // const STORAGE_PATH = require('os').homedir() + '/sshls.json';
    const STORAGE_PATH = 'sshls.json';
    // Check if file exists, if not, create it.
    try {
        Fs.statSync(STORAGE_PATH);
    } catch (e) {
        Fs.writeFile(STORAGE_PATH, JSON.stringify([], null, 2), function() {});
    }

    Fs.readFile(STORAGE_PATH, "utf-8", function (err, content) {
        if (err) {
            console.log(err);
        }
        try {
            content = JSON.parse(content);
        } catch (e) {
            err = e;
        }

        SSHLS = content;
        
        console.log(SSHLS);
    });


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
        const answers = await askQuestions();
    };

    run();
};