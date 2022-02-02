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

const sources = [
    "affinity",
    "airtable",
    "amplitude",
    "api",
    "awsathena",
    "azuresql",
    "bigquery",
    "chargebee",
    "cosmosdb",
    "csv",
    "databricks",
    "dialpad",
    "dynamodb",
    "gohighlevel",
    "gsheets",
    "harmonic",
    "hubspot",
    "mongodb",
    "mysql",
    "postgresql",
    "redshift",
    "salesforce",
    "snowflake",
    "stripe",
    "synapse"
]
const destinations = [
    "affinity",
    "airtable",
    "amplitude",
    "bigquery",
    "dynamodb",
    "fbaudience",
    "freshdesk",
    "front",
    "googleads",
    "gsheets",
    "hubspot",
    "intercom",
    "iterable",
    "klaviyo",
    "marketo",
    "mysql",
    "pipedrive",
    "postgresql",
    "redshift",
    "salesforce",
    "segment",
    "smartsheet",
    "snowflake",
    "stripe",
    "webhook",
    "zendesk"
]

fs.promises
    .readdir(`./src/imgs/`)
    .then(files => {
        return files.filter(file => fileType.test(file)).map(file => file.replace(`.${ext}`, ""))
    })
    .then(fileNames => {
        let payload = ""
        let source = "export const source = [\n"
        let dest = "export const destination = [\n"
        fileNames.forEach((name, idx, arr) => {
            payload += `import ${name} from "./imgs/${name}.${ext}"\n`
            if (sources.includes(name)) {
                source += `    ${name},\n`
            }
            if (destinations.includes(name)) {
                dest += `    ${name},\n`
            }
        })
        payload += `\n${source}\n]\n${dest}]\n`
        fs.writeFile(`./src/graphics.ts`, payload, err => {
            if (err) {
                return console.log("writeFile error", err)
            }
        })
    })
    .catch(err => {
        console.log("readdir error:", err)
    })
