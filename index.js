#!/usr/bin/env node

const axios = require('axios')
const { program } = require('commander')
const chalk = require('chalk');
const Table = require('cli-table3')


program
    .version('1.0.0')
    .description('Github Profile CLI')

program
    .command('profile <username>') // --> this will enter a github username.
    .alias('p') // --> use 'p' as an alternative for profile.
    .description('Github Profile CLI')
    .action((username) => {
        axios
            .get(`https://api.github.com/users/${username}`)
            .then((response) => {
                const user = response.data;
                const table = new Table({ head: [chalk.greenBright("Form"), chalk.greenBright("Data")] })

                table.push(
                    [chalk.whiteBright.bold('Username'), chalk.blueBright(user.login)],
                    [chalk.whiteBright.bold('Name'), chalk.blueBright(user.name || chalk.redBright('Has not provided a name'))],
                    [chalk.whiteBright.bold('Bio'), chalk.blueBright(user.bio || chalk.redBright('No bio available'))],
                    [chalk.whiteBright.bold('Followers'), chalk.blueBright(user.followers)],
                    [chalk.whiteBright.bold('Following'), chalk.blueBright(user.following)],
                    [chalk.whiteBright.bold('Public Repos'), chalk.blueBright(user.public_repos)],
                    [chalk.whiteBright.bold('Location'), chalk.blueBright(user.location || chalk.redBright('Location not specified'))],
                )
                console.log(table.toString());
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    console.error('User Not Found');
                } else {
                    console.error('Error fetching profile:', error.response ? error.response.data.message : 'Unknown error');
                }
            });
    })

program.parse(process.argv)