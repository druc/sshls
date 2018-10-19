#!/usr/bin/env node
const Fs = require('fs');
const chalk = require('chalk');
const t = require('table');

module.exports = () => {
    return {
        getStoragePath() {
            return require('os').homedir() + '/.sshls.json';
        },

        setupStorage() {
            try {
                Fs.statSync(this.getStoragePath());
            } catch (e) {
                Fs.writeFile(this.getStoragePath(), JSON.stringify([], null, 2), () => {
                });
            }
        },

        getRecords(callback) {
            if (!callback) {
                console.log(chalk.red('Something wrong happened.'));
                return;
            }

            Fs.readFile(this.getStoragePath(), "utf-8", function (err, content) {
                if (err) {
                    console.log(chalk.red('No records.'));
                    return;
                }
                try {
                    content = JSON.parse(content);
                } catch (e) {
                    console.log(chalk.red('Failed to parse records.'));
                }

                return callback(content);
            });
        },

        displayRecords(records) {
            let data = [
                ['#', 'Name', 'Connect', 'Password', 'User', 'Host'],
            ];

            records.forEach((item) => {
                data.push([
                    item.number,
                    item.name,
                    item.connect,
                    item.password,
                    item.user,
                    item.host
                ]);
            });

            console.log(t.table(data, {}));
        }
    }
};