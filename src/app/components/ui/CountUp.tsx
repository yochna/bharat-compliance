"use client"

import {useEffect,useRef,useState} from "react"

interface CountUpProps{
    end:number,
    duration?:number
    prefix?:string
    suffix?:string
}

export function CountUp({
    end,
    duration=2000,
    prefix="",
    suffix="",
}:CountUpProps){
    const[count,setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const started = useRef(false)

    useEffect(()=>{
        const observer = new IntersectionObserver(
            ([entry])=>{
                if(entry.isIntersecting && !started.current){
                    started.current = true
                    const startTime = performance.now()

                    const tick = (now:number)=>{
                        const elapsed = now-startTime
                        const progress = Math.min(elapsed/duration,1)
                        const eased = 1-Math.pow(1-progress,3)
                        setCount(Math.floor(eased*end))
                        if(progress<1) requestAnimationFrame(tick)
                    }
                requestAnimationFrame(tick)
                }
            },
            {threshold:0.5}
        )
        if(ref.current) observer.observe(ref.current)
            return()=> observer.disconnect()
    },[end,duration])
    return(
        <span ref={ref}
        >
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    )
}