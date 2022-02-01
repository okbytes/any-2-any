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

    const imageIndex = wrap(0, logos.length, page)

    const direction = spin === "up" ? -1 : 1

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
