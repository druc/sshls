const minimist = require('minimist');
const common = require('./common');

module.exports = () => {
    common().setupStorage();
    const args = minimist(process.argv.slice(2));
    let command = args._[0] || null;
    command = command === 'h' ? 'help' : command;

    switch (command) {
        case 'add':
            require('./cmds/addRecord')();
            break;

        case 'rm':
            require('./cmds/removeRecord')(args);
            break;

        case 'help':
            require('./cmds/showHelp')();
            break;

        default:
            require('./cmds/listRecords')();
            break;
    }
};
