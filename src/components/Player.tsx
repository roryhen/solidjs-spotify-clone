import type { Component, Setter } from "solid-js"
import { createSignal } from "solid-js/types/reactive/signal"
import "./player.css"

type Props = {
  currentTimeSeconds: number
  totalTimeSeconds: number
  audioSrc: string
  setCurrentTime: Setter<number>
}

const secondsAsClock = (seconds: number) =>
  `${(seconds / 60) | 0}:${
    seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60
  }`

export const Player: Component<Props> = (props) => {
  const id = `range-input-${atob(props.audioSrc)}`
  const currentTime = () => secondsAsClock(props.currentTimeSeconds)
  const totalTime = () =>
    secondsAsClock(props.totalTimeSeconds - props.currentTimeSeconds)
  const progressPercentage = () =>
    (props.currentTimeSeconds / props.totalTimeSeconds) * 100
  const handleInput = (e: InputEvent) =>
    props.setCurrentTime((e.currentTarget as HTMLInputElement).valueAsNumber)

  return (
    <div
      class="player"
      style={{ "--player-progress": `${progressPercentage().toFixed(2)}%` }}
    >
      <label class="sr-only" for={id}>
        Audio Slider
      </label>
      <input
        class="player__range"
        id={id}
        type="range"
        min="0"
        max={props.totalTimeSeconds}
        value={props.currentTimeSeconds}
        onInput={handleInput}
      />
      <audio src={props.audioSrc} preload="metadata">
        <a href={props.audioSrc}>Download audio</a>
      </audio>
      <div class="player__timestamps">
        <span>{currentTime()}</span>
        <span>-{totalTime()}</span>
      </div>
    </div>
  )
}
