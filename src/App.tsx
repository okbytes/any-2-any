import * as React from "react"
import {Slot} from "./slot"
import {useInterval} from "./use-interval"

const h1Styles = "text-7xl font-bold pointer-events-none"

const MS_CYCLE = 1500 // in ms
const MS_PAUSE = 4000 // in ms
const MS_ITEM = 250 // in ms

const PAUSE = {item: null, main: MS_PAUSE, type: "pause"}
const CYCLE = {item: MS_ITEM, main: MS_CYCLE, type: "cycle"}

export default function App() {
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
        <div className="h-[80vh] grid place-content-center p-10 font-sans space-y-6">
            <div className="w-full flex items-center">
                <h1 className={h1Styles}>Sync</h1>

                <Slot spin="down" delay={delay.item} hover={hover} setHover={setHover} />

                <h1 className={h1Styles}>to</h1>

                <Slot spin="up" delay={delay.item} hover={hover} setHover={setHover} />
            </div>

            <h2 className="text-4xl text-gray-300 font-medium">
                The one platform to sync any data anywhere.
            </h2>
        </div>
    )
}
