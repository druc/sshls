const t = require('table');
const Fs = require('fs');

module.exports = () => {
    const STORAGE_PATH = 'sshls.json';

    const run = async () => {
        let data,
            output;

        data = [
            ['#', 'Name', 'Connect', 'Password', 'User', 'Host'],
            ['1', 'Test', 'web@test', 'test', 'web', 'test'],
        ];

        Fs.readFile(STORAGE_PATH, "utf-8", function (err, content) {
            if (err) {
                console.log(err);
            }
            try {
                content = JSON.parse(content);
            } catch (e) {
                console.log(e);
            }

            data = [];

            content.forEach((item) => {
                data.push([
                    item.id,
                    item.name,
                    item.name,
                    item.command,
                    item.host,
                    item.password
                ]);
            });
            
            output = t.table(data, {});

            console.log(output);
        });
    };

    run();
};