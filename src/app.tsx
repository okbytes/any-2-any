import * as React from "react"
import {Slot} from "./slot"
import {useInterval} from "./use-interval"

const h1Styles = "text-7xl font-bold pointer-events-none"

const ITEMS_IN_CYCLE = 4
const MS_ITEM = 250 // in ms
const MS_CYCLE = MS_ITEM * ITEMS_IN_CYCLE // in ms
const MS_PAUSE = 4000 // in ms

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
        <>
            <div className="px-10 mx-auto max-w-5xl">
                <nav className="mb-20 py-8 flex items-center justify-between">
                    <img src="/assets/polytomic.svg" className="w-8 h-8" />
                    <div className="flex items-center space-x-6">
                        <p className="text-gray-300 font-semibold">Product</p>
                        <p className="text-gray-300 font-semibold">Use cases</p>
                        <p className="text-gray-300 font-semibold">Integrations</p>
                        <p className="text-gray-300 font-semibold">Customers</p>
                        <p className="text-gray-300 font-semibold">Resources</p>
                        <div className="space-x-2">
                            <button className="h-8 px-3 border-2 border-indigo-600 rounded text-white font-semibold bg-indigo-600">
                                Get a demo
                            </button>

                            <button className="h-8 px-3 border-2 border-indigo-600 rounded text-white font-semibold bg-gray-800">
                                Log in
                            </button>
                        </div>
                    </div>
                </nav>
                <div className="font-sans">
                    <div className="w-full flex items-center">
                        <h1 className={h1Styles}>Sync</h1>

                        <Slot spin="down" delay={delay.item} hover={hover} setHover={setHover} />

                        <h1 className={h1Styles}>to</h1>

                        <Slot spin="up" delay={delay.item} hover={hover} setHover={setHover} />
                    </div>

                    <h2 className="mt-6 text-4xl text-gray-300 font-medium">
                        The one platform to sync any data anywhere.
                    </h2>

                    <div className="mt-16 flex items-center space-x-2">
                        <button className="h-11 px-6 border-2 border-indigo-600 rounded text-white font-semibold bg-indigo-600">
                            Get a demo
                        </button>
                        <p className="text-gray-300">or</p>
                        <button className="h-11 px-6 border-2 border-indigo-600 rounded text-white font-semibold bg-gray-800">
                            Start free trial
                        </button>
                    </div>
                </div>
            </div>
            <img src="/assets/waves.svg" className="w-full" />
        </>
    )
}
