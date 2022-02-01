import * as React from "react"
import {AnimatePresence, motion} from "framer-motion"
import {wrap} from "popmotion"
import {useInterval} from "./use-interval"

const logos = [
    "imgs/logos-01.svg",
    "imgs/logos-02.svg",
    "imgs/logos-03.svg",
    "imgs/logos-04.svg",
    "imgs/logos-05.svg",
    "imgs/logos-06.svg",
    "imgs/logos-07.svg",
    "imgs/logos-08.svg",
    "imgs/logos-09.svg",
    "imgs/logos-10.svg",
    "imgs/logos-11.svg",
    "imgs/logos-12.svg",
    "imgs/logos-13.svg",
    "imgs/logos-14.svg",
    "imgs/logos-15.svg",
    "imgs/logos-16.svg",
    "imgs/logos-17.svg",
    "imgs/logos-18.svg",
    "imgs/logos-19.svg",
    "imgs/logos-20.svg",
    "imgs/logos-21.svg",
    "imgs/logos-22.svg",
    "imgs/logos-23.svg",
    "imgs/logos-24.svg",
    "imgs/logos-25.svg",
    "imgs/logos-26.svg",
    "imgs/logos-27.svg",
    "imgs/logos-28.svg",
    "imgs/logos-29.svg",
    "imgs/logos-30.svg",
    "imgs/logos-31.svg",
    "imgs/logos-32.svg",
    "imgs/logos-33.svg",
    "imgs/logos-34.svg",
    "imgs/logos-35.svg",
    "imgs/logos-36.svg",
    "imgs/logos-37.svg",
    "imgs/logos-38.svg",
    "imgs/logos-39.svg",
    "imgs/logos-40.svg",
    "imgs/logos-41.svg",
    "imgs/logos-42.svg"
]

const TRAVEL = 50

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
                        y: direction > 0 ? -TRAVEL : TRAVEL,
                        zIndex: 0,
                        opacity: 0
                    }),
                    center: {
                        y: 0,
                        zIndex: 1,
                        opacity: 1
                    },
                    exit: (direction: number) => ({
                        y: direction < 0 ? -TRAVEL : TRAVEL,
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

const CYCLE = 215

export default function App() {
    const [delay, setDelay] = React.useState<number | null>(CYCLE)

    useInterval(() => {
        if (delay) {
            setDelay(null)
        } else {
            setDelay(CYCLE)
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
