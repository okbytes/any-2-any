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
    "imgs/pardot.svg",
    "imgs/pipedrive.svg",
    "imgs/polytomic.svg",
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

const travel = 50

interface SlotProps {
    delay: number | null
    spin: "up" | "down"
}

function Slot({delay, spin}: SlotProps) {
    const [page, setPage] = React.useState(0)
    const [hovered, setHovered] = React.useState(false)

    const imageIndex = wrap(0, logos.length, page)

    const direction = spin === "up" ? -1 : 1

    const spinit = (newDirection: number) => {
        setPage(prev => prev + newDirection)
    }

    useInterval(
        () => {
            spinit(direction)
        },
        hovered ? null : delay
    )

    return (
        <AnimatePresence initial={false} custom={direction}>
            <motion.img
                key={page}
                src={logos[imageIndex]}
                custom={direction}
                variants={{
                    enter: (direction: number) => ({
                        y: direction > 0 ? -travel : travel,
                        zIndex: 0,
                        opacity: 0
                    }),
                    center: {
                        y: 0,
                        zIndex: 1,
                        opacity: 1
                    },
                    exit: (direction: number) => ({
                        y: direction < 0 ? -travel : travel,
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
                    y: {type: "spring", stiffness: 350, damping: 30},
                    opacity: {duration: 0.2}
                }}
                initial="enter"
                animate="center"
                exit="exit"
                onPointerOver={() => {
                    setHovered(true)
                }}
                onPointerOut={() => {
                    setHovered(false)
                }}
                whileHover="hovered"
            />
        </AnimatePresence>
    )
}

const cycle = 215

export default function App() {
    const [delay, setDelay] = React.useState<number | null>(cycle)

    useInterval(() => {
        if (delay) {
            setDelay(null)
        } else {
            setDelay(cycle)
        }
    }, 1500)

    return (
        <div className="App">
            <div className="heading">
                <h1>Any</h1>
                <div className="slot">
                    <Slot spin="down" delay={delay} />
                </div>
                <h1>to any</h1>
                <div className="slot">
                    <Slot spin="up" delay={delay} />
                </div>
            </div>
        </div>
    )
}
