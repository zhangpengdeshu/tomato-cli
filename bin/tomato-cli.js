#!/usr/bin/env node
// 开始处理命令
const program = require('commander')

program
    .version(require('../package').version)
    .usage('<command> [options]')

// 创建命令
program
    .command('create <app-name>')
    .description('create a new project')
    .option('-p, --preset <presetName>', 'Skip prompts and use saved or remote preset')
    .option('-d, --default', 'Skip prompts and use default preset')
    .action((name, args) => {
       const options = cleanArgs(args)
       console.log('options', options)
       require('../lib/create')(name, options)
    })

// 调用
program.parse(process.argv)

if (!process.argv.slice(2).length) {
    program.outputHelp()
}

function cleanArgs(options) {
    const args = {}
    Object.keys(options).forEach(key => {
        args[key] = options[key]
    })
    return args
}
