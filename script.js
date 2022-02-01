const fs = require("fs")
const ext = "svg"
const fileType = new RegExp(`${ext}$`)

function clearAndUpper(text) {
    return text.replace(/-/, "").toUpperCase()
}

function toCamelCase(text) {
    return text.replace(/-\w/g, clearAndUpper)
}

function toPascalCase(text) {
    return text.replace(/(^\w|-\w)/g, clearAndUpper)
}

function generateStuff(target) {
    fs.promises
        .readdir(`./public/imgs/`)
        .then(files => {
            return files
                .filter(file => fileType.test(file))
        })
        .then(fileNames => {
            let indexPayload = ""
            fileNames.forEach((name, idx, arr) => {
                indexPayload += `\"imgs\/${name}\",\n`
            })
            fs.writeFile(`./imgs.txt`, indexPayload, err => {
                if (err) {
                    return console.log("writeFile error", err)
                }
                console.log(`all good`)
            })
        })
        .catch(err => {
            console.log("readdir error:", err)
        })
}

generateStuff()
