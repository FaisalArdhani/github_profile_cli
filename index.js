#!/usr/bin/env node

const axios = require('axios')
const { program } = require('commander')

program
    .version('1.0.0')
    .description('Github Profile CLI')

program
    .command('profile <username>') // --> this will enter a github username
    .alias('p')
    .description('Github Profile CLI')
    .action((username) => {
        axios
            .get(`https://api.github.com/users/${username}`)
            .then((response) => {
                const user = response.data;
                console.log(`
            Username: ${user.login}
            Name: ${user.name || 'N/A'}
            Bio: ${user.bio || 'N/A'}
            Followers: ${user.followers}
            Following: ${user.following}
            Public Repos: ${user.public_repos}
        `)
            })
            .catch((error) => {
                console.error('Error fetching profile:', error.response.data.message)
            })
    })

program.parse(process.argv)