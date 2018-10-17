const t = require('table');
const Fs = require('fs');
const chalk = require('chalk');

const STORAGE_PATH = 'sshls.json';

module.exports = () => {

    const displayRecords = (content) => {
        let data = [
            ['#', 'Name', 'Connect', 'Password', 'User', 'Host'],
        ];

        content.forEach((item) => {
            data.push([
                item.id,
                item.name,
                item.connect,
                item.password,
                item.user,
                item.host
            ]);
        });

        console.log(t.table(data, {}));
    };

    const fetchRecords = (callback) => {
        if (!callback) {
            console.log(chalk.red('Something wrong happened.'));
            return;
        }

        Fs.readFile(STORAGE_PATH, "utf-8", function (err, content) {
            if (err || !content.length) {
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

    fetchRecords(displayRecords);
};