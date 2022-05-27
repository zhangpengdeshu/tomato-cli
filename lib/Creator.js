const inquirer = require('inquirer')
const fs = require('fs-extra')
const path = require('path')
const loadRemoteTempalte = require('./utils/loadRemoteTemplate')
const copyFile = require('./utils/copyFile')

class Creator {
    constructor(name, dir) {
        this.name = name
        this.dir = dir
    }

    async selectTemplate() {
        const { templateName } = await inquirer.prompt([
            {
                name: 'templateName',
                type: 'list',
                message: 'Please select a template',
                choices: ['vue-admin-template']
            }
        ])
        return templateName
    }

    async create() {
        const { name, dir } = this
        const templateName = await this.selectTemplate()
        const { tmpdir } = await loadRemoteTempalte(templateName)
        const { pkgVersion, pkgDesc } = await inquirer.prompt([
            {
                name: 'pkgVersion',
                type: 'input',
                message: 'Please input project version',
                default: '1.0.0'
            },
            {
                name: 'pkgDesc',
                type: 'input',
                message: 'Please input project description',
                default: 'Project created by tomato-cli'
            }
        ])

        const pkgJson = await copyFile(tmpdir, dir)

        const pkg = Object.assign(pkgJson, {
            name,
            version: pkgVersion,
            description: pkgDesc
        })

        const filePath = path.join(dir, 'package.json')
        fs.ensureDirSync(path.dirname(filePath))
        await fs.writeJsonSync(filePath, pkg)
    }

}

module.exports = Creator
