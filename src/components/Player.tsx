import type { Component, Setter } from "solid-js"
import "./player.css"

type Props = {
  currentTime: number
  setCurrentTime: Setter<number>
  audioTrack?: HTMLAudioElement
  audioSrc: string
  duration: number
}

const secondsAsClock = (seconds: number) =>
  `${(seconds / 60) | 0}:${
    seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60
  }`

const asPercentage = (number: number) => (number * 100).toFixed(2)

export const Player: Component<Props> = (props) => {
  const currentTimeDisplay = () => secondsAsClock(props.currentTime)
  const timeLeft = () => secondsAsClock(props.duration - props.currentTime)
  const progressPercentage = () =>
    asPercentage(props.currentTime / props.duration)
  const id = `range-input-${btoa(props.audioSrc).slice(0, 6)}`

  const handleInput = (e: InputEvent) => {
    const inputValue = (e.currentTarget as HTMLInputElement).valueAsNumber
    props.setCurrentTime(inputValue)
    if (props.audioTrack) {
      props.audioTrack.currentTime = inputValue
    }
  }

  return (
    <div
      class="player"
      style={{
        "--player-progress": `${progressPercentage()}%`,
      }}
    >
      <label class="sr-only" for={id}>
        Audio Slider
      </label>
      <input
        class="player__range"
        id={id}
        type="range"
        min="0"
        max={props.duration}
        value={props.currentTime}
        onInput={handleInput}
      />
      <div class="player__timestamps">
        <span>{currentTimeDisplay()}</span>
        <span>-{timeLeft()}</span>
      </div>
    </div>
  )
}
