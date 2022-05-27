const fs = require('fs-extra')
const path = require('path')
const download = require('download-git-repo')
const os = require('os')

async function loadRemoteTemplate(templateName) {
    const tmpdir = path.join(os.tmpdir(), 'temp')
    await fs.remove(tmpdir)
    await new Promise((resolve, reject) => {
        download(`PanJiaChen/${templateName}`, tmpdir, {clone: true}, err => {
            if(err) reject(err)
            resolve()
        })
    })
    return {
        tmpdir
    }
}

module.exports = loadRemoteTemplate
