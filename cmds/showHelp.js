const menus = {
    main: `
    sshls                List records
    sshls add            Add record wizard
    sshls rm [number]    Remove record by number

    help ............... show this help menu
    `,
};

module.exports = () => {
    console.log(menus.main);
};
