import type { Component, Setter, Accessor } from "solid-js"
import "./player.css"

type Props = {
  currentTime: number
  setCurrentTime: Setter<number>
  audioTrack: Accessor<HTMLAudioElement>
  setAudioTrack: Setter<HTMLAudioElement>
  duration: number
  audioSrc: string
}

const secondsAsClock = (seconds: number) =>
  `${(seconds / 60) | 0}:${
    seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60
  }`

export const Player: Component<Props> = (props) => {
  const currentTimeDisplay = () => secondsAsClock(props.currentTime)
  const timeLeft = () => secondsAsClock(props.duration - props.currentTime)
  const progressPercentage = () =>
    ((props.currentTime / props.duration) * 100).toFixed(2)
  const id = `range-input-${btoa(props.audioSrc).slice(0, 6)}`

  const handleInput = (e: InputEvent) => {
    const inputValue = (e.currentTarget as HTMLInputElement).valueAsNumber
    props.setCurrentTime(inputValue)
    props.audioTrack.currentTime = inputValue
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
      <audio ref={props.setAudioTrack} src={props.audioSrc} preload="metadata">
        <a href={props.audioSrc}>Download audio</a>
      </audio>
      <div class="player__timestamps">
        <span>{currentTimeDisplay()}</span>
        <span>-{timeLeft()}</span>
      </div>
    </div>
  )
}
