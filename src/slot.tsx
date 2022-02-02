import * as React from "react"
import {AnimatePresence, motion} from "framer-motion"
import {wrap} from "popmotion"

import {useInterval} from "./use-interval"

import {source, destination} from "./data"
import {svgSymbols} from "./svg-symbols"

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
    const logos = spin === "up" ? destination : source

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
                <motion.svg
                    key={page}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    custom={direction}
                    className="absolute w-[4.5rem] h-[4.5rem] hover:cursor:pointer"
                    variants={{
                        enter: (direction: number) => ({
                            y: direction > 0 ? -TRAVEL : TRAVEL,
                            scale: TRAVEL_SCALE,
                            opacity: 0
                        }),
                        center: {
                            y: 0,
                            scale: 1,
                            opacity: 1
                        },
                        exit: (direction: number) => ({
                            y: direction < 0 ? -TRAVEL : TRAVEL,
                            scale: TRAVEL_SCALE,
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
                >
                    {svgSymbols}
                    <use href={`#${logos[imageIndex]}`} />
                </motion.svg>
            </AnimatePresence>
        </div>
    )
}
