const minimist = require('minimist');

module.exports = () => {
    const args = minimist(process.argv.slice(2));
    let command = args._[0] || 'help';

    if (args.version || args.v) {
        command = 'version'
    }

    if (args.help || args.h) {
        command = 'help'
    }

    switch (command) {
        case 'add':
            require('./cmds/addSshAccount')();
            break;
        //
        // case 'help':
        //     require('./cmds/help')(args);
        //     break;

        default:
            require('./cmds/listSshAccounts')();
            break;
    }
};
