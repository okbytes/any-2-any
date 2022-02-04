import * as React from "react"
import {AnimatePresence, motion} from "framer-motion"

import {useInterval} from "./use-interval"

import {Svgs} from "./svg-symbols"

const DISTANCE = 36 // in px
const TRAVEL_SCALE = 0.667 // % as decimal

interface SlotProps {
    delay: number | null
    direction: 1 | -1
    logos: string[]
    setHover: React.Dispatch<React.SetStateAction<boolean>>
}

export function Slot({delay, direction, logos, setHover}: SlotProps) {
    const [page, setPage] = React.useState(0)

    const imageIndex = wrap(0, logos.length, page)

    useInterval(() => {
        setPage(prev => prev + 1)
    }, delay)

    return (
        <div className="relative my-0 mx-6 w-[4.5rem] h-[4.5rem] hover:cursor-pointer">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    className="absolute w-[4.5rem] h-[4.5rem] hover:cursor:pointer"
                    variants={{
                        enter: (direction: number) => ({
                            y: direction > 0 ? -DISTANCE : DISTANCE,
                            scale: TRAVEL_SCALE,
                            opacity: 0
                        }),
                        center: {
                            y: 0,
                            scale: 1,
                            opacity: 1
                        },
                        exit: (direction: number) => ({
                            y: direction < 0 ? -DISTANCE : DISTANCE,
                            scale: TRAVEL_SCALE,
                            opacity: 0
                        }),
                        hovered: {
                            scale: 1.18,
                            rotate: 6,
                            transition: {
                                type: "spring",
                                stiffness: 350,
                                damping: 30
                            }
                        }
                    }}
                    transition={{
                        ease: [0.25, 0.1, 0.25, 1],
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
                >
                    <Svgs logo={logos[imageIndex]} />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}
