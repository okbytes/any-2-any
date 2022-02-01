import * as React from "react"
import {AnimatePresence, motion} from "framer-motion"
import {wrap} from "popmotion"
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

const left = [
    "imgs/shipbob.svg",
    "imgs/redshift.svg",
    "imgs/intercom.svg",
    "imgs/mysql.svg",
    "imgs/gohighlevel.svg",
    "imgs/postgresql.svg",
    "imgs/livechat.svg",
    "imgs/harmonic.svg",
    "imgs/pipedrive.svg",
    "imgs/bigquery.svg",
    "imgs/freshdesk.svg",
    "imgs/salesforce.svg",
    "imgs/googleads.svg",
    "imgs/affinity.svg",
    "imgs/hubspot.svg",
    "imgs/marketo.svg",
    "imgs/api.svg",
    "imgs/fbaudience.svg",
    "imgs/iterable.svg",
    "imgs/synapse.svg",
    "imgs/klaviyo.svg",
    "imgs/databricks.svg",
    "imgs/amplitude.svg",
    "imgs/stripe.svg",
    "imgs/chargebee.svg",
    "imgs/cosmosdb.svg",
    "imgs/dynamodb.svg",
    "imgs/smartsheet.svg",
    "imgs/snowflake.svg",
    "imgs/front.svg",
    "imgs/awsathena.svg",
    "imgs/azuresql.svg",
    "imgs/airtable.svg",
    "imgs/dialpad.svg",
    "imgs/webhook.svg",
    "imgs/gsheets.svg",
    "imgs/segment.svg",
    "imgs/csv.svg",
    "imgs/zendesk_support.svg",
    "imgs/mongodb.svg"
]
const right = [
    "imgs/mysql.svg",
    "imgs/stripe.svg",
    "imgs/livechat.svg",
    "imgs/googleads.svg",
    "imgs/salesforce.svg",
    "imgs/intercom.svg",
    "imgs/smartsheet.svg",
    "imgs/affinity.svg",
    "imgs/harmonic.svg",
    "imgs/mongodb.svg",
    "imgs/marketo.svg",
    "imgs/dialpad.svg",
    "imgs/pipedrive.svg",
    "imgs/synapse.svg",
    "imgs/postgresql.svg",
    "imgs/awsathena.svg",
    "imgs/gsheets.svg",
    "imgs/klaviyo.svg",
    "imgs/airtable.svg",
    "imgs/shipbob.svg",
    "imgs/databricks.svg",
    "imgs/segment.svg",
    "imgs/hubspot.svg",
    "imgs/snowflake.svg",
    "imgs/chargebee.svg",
    "imgs/dynamodb.svg",
    "imgs/iterable.svg",
    "imgs/freshdesk.svg",
    "imgs/front.svg",
    "imgs/azuresql.svg",
    "imgs/api.svg",
    "imgs/cosmosdb.svg",
    "imgs/bigquery.svg",
    "imgs/zendesk_support.svg",
    "imgs/csv.svg",
    "imgs/gohighlevel.svg",
    "imgs/amplitude.svg",
    "imgs/redshift.svg",
    "imgs/fbaudience.svg",
    "imgs/webhook.svg"
]

const TRAVEL = 72 // in px
const TRAVEL_SCALE = 0.125 // % as decimal

interface SlotProps {
    delay: number | null
    spin: "up" | "down"
    hover: boolean
    setHover: React.Dispatch<React.SetStateAction<boolean>>
}

export function Slot({delay, spin, hover, setHover}: SlotProps) {
    const [page, setPage] = React.useState(0)
    const direction = spin === "up" ? -1 : 1
    const logos = spin === "up" ? right : left

    const imageIndex = wrap(0, logos.length, page)

    const paginate = (newDirection: number) => {
        setPage(prev => prev + newDirection)
    }

    useInterval(
        () => {
            paginate(direction)
        },
        hover ? null : delay
    )

    return (
        <div className="relative my-0 mx-6 w-[4.5rem] h-[4.5rem] hover:cursor-pointer">
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={page}
                    src={logos[imageIndex]}
                    custom={direction}
                    className="absolute w-[4.5rem] hover:cursor:pointer"
                    variants={{
                        enter: (direction: number) => ({
                            y: direction > 0 ? -TRAVEL : TRAVEL,
                            scale: TRAVEL_SCALE,
                            zIndex: 0,
                            opacity: 0
                        }),
                        center: {
                            y: 0,
                            scale: 1,
                            zIndex: 1,
                            opacity: 1
                        },
                        exit: (direction: number) => ({
                            y: direction < 0 ? -TRAVEL : TRAVEL,
                            scale: TRAVEL_SCALE,
                            zIndex: 0,
                            opacity: 0
                        }),
                        hovered: {
                            scale: 1.18,
                            rotate: 6,
                            transition: {
                                type: "spring",
                                stiffness: 350,
                                // bounce: 0.2
                                damping: 30
                            }
                        }
                    }}
                    transition={{
                        ease: [0.25, 0.1, 0.25, 1],
                        y: {type: "spring", stiffness: 350, damping: 30},
                        opacity: {duration: 0.2}
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    onPointerOver={() => {
                        setHover(true)
                    }}
                    onPointerOut={() => {
                        setHover(false)
                    }}
                    whileHover="hovered"
                />
            </AnimatePresence>
        </div>
    )
}
