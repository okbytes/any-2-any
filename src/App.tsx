import * as React from "react"
import {Slot} from "./slot"
import {useInterval} from "./use-interval"

const logos = [
    "imgs/affinity.svg",
    "imgs/airtable.svg",
    "imgs/amplitude.svg",
    "imgs/api.svg",
    "imgs/awsathena.svg",
    "imgs/azuresql.svg",
    "imgs/bigquery.svg",
    "imgs/chargebee.svg",
    "imgs/cosmosdb.svg",
    "imgs/csv.svg",
    "imgs/databricks.svg",
    "imgs/dialpad.svg",
    "imgs/dynamodb.svg",
    "imgs/fbaudience.svg",
    "imgs/freshdesk.svg",
    "imgs/front.svg",
    "imgs/gohighlevel.svg",
    "imgs/googleads.svg",
    "imgs/gsheets.svg",
    "imgs/harmonic.svg",
    "imgs/hubspot.svg",
    "imgs/intercom.svg",
    "imgs/iterable.svg",
    "imgs/klaviyo.svg",
    "imgs/livechat.svg",
    "imgs/marketo.svg",
    "imgs/mongodb.svg",
    "imgs/mysql.svg",
    "imgs/pipedrive.svg",
    "imgs/postgresql.svg",
    "imgs/redshift.svg",
    "imgs/salesforce.svg",
    "imgs/segment.svg",
    "imgs/shipbob.svg",
    "imgs/smartsheet.svg",
    "imgs/snowflake.svg",
    "imgs/stripe.svg",
    "imgs/synapse.svg",
    "imgs/webhook.svg",
    "imgs/zendesk_support.svg"
]

const h1Styles = "text-7xl font-bold pointer-events-none"

const CYCLE = 1500

const PAUSE = 4000

const ITEM = 250

export default function App() {
    const [delay, setDelay] = React.useState<number | null>(ITEM)
    const [hover, setHover] = React.useState(false)

    useInterval(
        () => {
            if (delay) {
                setDelay(null)
            } else {
                setDelay(ITEM)
            }
        },
        hover ? null : CYCLE
    )

    return (
        <div className="h-[80vh] grid place-content-center p-10 font-sans space-y-6">
            <div className="w-full flex items-center">
                <h1 className={h1Styles}>Sync</h1>

                <Slot spin="down" delay={delay} hover={hover} setHover={setHover} />

                <h1 className={h1Styles}>to</h1>

                <Slot spin="up" delay={delay} hover={hover} setHover={setHover} />
            </div>

            <h2 className="text-4xl text-gray-300 font-medium">
                The one platform to sync any data anywhere.
            </h2>
        </div>
    )
}
