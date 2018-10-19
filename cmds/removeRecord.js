#!/usr/bin/env node
const Fs = require('fs');
const chalk = require('chalk');
const common = require('../common');

module.exports = (args) => {
    let recordNumber = args._[1] || null;

    if (!recordNumber) {
        console.log(chalk.red('Number is required.'));
        return;
    }

    const run = async () => {
        const removeChosenRecord = (data) => {
            let foundAndRemoved = false;
            
            data.forEach((record, index) => {
                if (record.number === recordNumber) {
                    data.splice(index, 1);
                    foundAndRemoved = true;
                }
            });

            Fs.writeFile(common().getStoragePath(), JSON.stringify(data, null, 2), function () {
                if (foundAndRemoved) {
                    console.log(chalk.green('Record removed.'));
                } else {
                    console.log(chalk.red('Record not found.'));
                }
            });
        };

        common().getRecords(removeChosenRecord);
    };

    run();
};