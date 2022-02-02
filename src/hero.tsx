import * as React from "react"
import {Slot} from "./slot"
import {useInterval} from "./use-interval"

import {source, destination} from "./data"

const h1Styles = "text-7xl font-bold pointer-events-none"

const ITEMS_IN_CYCLE = 4
const MS_ITEM = 250 // in ms
const MS_CYCLE = MS_ITEM * ITEMS_IN_CYCLE // in ms
const MS_PAUSE = 4000 // in ms

const PAUSE = {item: null, main: MS_PAUSE, type: "pause"}
const CYCLE = {item: MS_ITEM, main: MS_CYCLE, type: "cycle"}

export function Hero() {
    const [delay, setDelay] = React.useState<typeof PAUSE | typeof CYCLE>(CYCLE)
    const [hover, setHover] = React.useState(false)

    React.useEffect(() => {
        if (hover) {
            setDelay(PAUSE)
        }
    }, [hover])

    useInterval(
        () => {
            if (delay.type === "cycle") {
                setDelay(PAUSE)
            } else {
                setDelay(CYCLE)
            }
        },
        hover ? null : delay.main
    )
    return (
        <div className="w-full flex items-center">
            <h1 className={h1Styles}>Sync</h1>

            <Slot
                logos={source}
                direction={1}
                delay={delay.item}
                hover={hover}
                setHover={setHover}
            />

            <h1 className={h1Styles}>to</h1>

            <Slot
                logos={destination}
                direction={-1}
                delay={delay.item}
                hover={hover}
                setHover={setHover}
            />
        </div>
    )
}
