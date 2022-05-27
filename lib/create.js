const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const inquirer = require('inquirer')

const Creator = require('./Creator')

async function create(projectName, options) {
    const cwd = options.cwd || process.cwd()
    const targetDir = path.resolve(cwd, projectName)
    const isExist = await fs.exists(targetDir)
    if(isExist) {
        const { action } = await inquirer.prompt([
            {
                name: 'action',
                type: 'list',
                message: `目标文件夹 ${chalk.cyan(targetDir)} 已经存在，请选择：`,
                choices: [
                    {
                        name: 'overwrite',
                        value: true
                    },
                    {
                        name: 'cancel',
                        value: false
                    }
                ]
            }
        ])

        if(!action) {
            return
        }
        if(action) {
            console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
            await fs.remove(targetDir)
        }
    }

    const creator = new Creator(projectName, targetDir)
    await creator.create()


}

module.exports = create
