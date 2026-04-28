"use client"

import { useEffect, useMemo, useState } from "react"

type CountdownSize = "large" | "small"
type CountdownVariant = "default" | "boxed" | "boxedLight"

interface CountdownTimerProps {
  targetDate: string
  size?: CountdownSize
  variant?: CountdownVariant
  showLabels?: boolean
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const ZERO_TIME: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
}

const formatUnit = (value: number) => String(Math.max(0, value)).padStart(2, "0")

function getTimeLeft(targetTimeMs: number): TimeLeft {
  const diffMs = targetTimeMs - Date.now()

  if (diffMs <= 0) {
    return ZERO_TIME
  }

  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}

function cx(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(" ")
}

export default function CountdownTimer({
  targetDate,
  size = "large",
  variant = "default",
  showLabels = true,
  className,
}: CountdownTimerProps) {
  const targetTimeMs = useMemo(() => new Date(targetDate).getTime(), [targetDate])
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(ZERO_TIME)

  useEffect(() => {
    const tick = () => {
      setTimeLeft(getTimeLeft(targetTimeMs))
    }

    tick()
    const intervalId = window.setInterval(tick, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [targetTimeMs])

  const valueClass =
    size === "large" ? "text-3xl font-semibold md:text-4xl" : "text-lg font-semibold md:text-xl"
  const labelClass = size === "large" ? "text-[11px] tracking-[0.2em]" : "text-[10px] tracking-[0.14em]"
  const separatorClass =
    size === "large"
      ? showLabels
        ? "pb-3 text-3xl md:text-4xl"
        : "text-3xl md:text-4xl"
      : showLabels
        ? "pb-2 text-lg md:text-xl"
        : "text-lg md:text-xl"
  const gapClass = size === "large" ? "gap-2.5 md:gap-3" : "gap-1.5 md:gap-2"

  if (variant === "boxed" || variant === "boxedLight") {
    const isLight = variant === "boxedLight"
    const boxedUnits = [
      { label: "Dias", value: formatUnit(timeLeft.days) },
      { label: "Horas", value: formatUnit(timeLeft.hours) },
      { label: "Minutos", value: formatUnit(timeLeft.minutes) },
      { label: "Segundos", value: formatUnit(timeLeft.seconds) },
    ]

    return (
      <div
        className={cx(
          "grid w-full max-w-[26rem] grid-cols-2 gap-2 sm:max-w-none sm:grid-cols-4 sm:gap-3",
          className,
        )}
        aria-label="Cuenta regresiva"
      >
        {boxedUnits.map((unit) => (
          <div
            key={unit.label}
            className={
              isLight
                ? "flex min-w-0 flex-col items-center rounded-xl border border-[#fd7914]/30 bg-white px-2 py-2 sm:px-3 sm:py-2.5"
                : "flex min-w-0 flex-col items-center rounded-2xl border border-white/80 bg-white/12 px-3 py-3 sm:px-4 sm:py-4"
            }
          >
            <span
              className={
                isLight
                  ? "text-3xl font-extrabold leading-none tabular-nums text-[#fd7914] sm:text-[3rem]"
                  : "text-3xl font-extrabold leading-none tabular-nums sm:text-[3.6rem]"
              }
            >
              {unit.value}
            </span>
            <span
              className={
                isLight
                  ? "mt-1 text-[10px] font-bold uppercase tracking-[0.06em] text-[#fd7914] sm:text-xs"
                  : "mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-sm"
              }
            >
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cx("inline-flex items-end", gapClass, className)} aria-label="Cuenta regresiva">
      <div className="flex flex-col items-center leading-none">
        <span className={cx(valueClass, "tabular-nums")}>{formatUnit(timeLeft.days)}</span>
        {showLabels && <span className={cx(labelClass, "mt-1 uppercase opacity-70")}>Dias</span>}
      </div>
      <span className={cx(separatorClass, "opacity-70")}>:</span>

      <div className="flex flex-col items-center leading-none">
        <span className={cx(valueClass, "tabular-nums")}>{formatUnit(timeLeft.hours)}</span>
        {showLabels && <span className={cx(labelClass, "mt-1 uppercase opacity-70")}>Horas</span>}
      </div>
      <span className={cx(separatorClass, "opacity-70")}>:</span>

      <div className="flex flex-col items-center leading-none">
        <span className={cx(valueClass, "tabular-nums")}>{formatUnit(timeLeft.minutes)}</span>
        {showLabels && <span className={cx(labelClass, "mt-1 uppercase opacity-70")}>Min</span>}
      </div>
      <span className={cx(separatorClass, "opacity-70")}>:</span>

      <div className="flex flex-col items-center leading-none">
        <span className={cx(valueClass, "tabular-nums")}>{formatUnit(timeLeft.seconds)}</span>
        {showLabels && <span className={cx(labelClass, "mt-1 uppercase opacity-70")}>Seg</span>}
      </div>
    </div>
  )
}
