import type { Component } from "solid-js"
import { createSignal } from "solid-js"
import { Divide, ListStart, MonitorSpeaker, Share, Volume2 } from "lucide-solid"
import "./bottombar.css"

type Props = {
  audioTrack: HTMLAudioElement
}

export const BottomBar: Component<Props> = (props) => {
  const [shown, setShown] = createSignal(false)
  const [volume, setVolume] = createSignal(1)
  const handleInput = (e: InputEvent) => {
    const inputValue = (e.currentTarget as HTMLInputElement).valueAsNumber
    props.audioTrack.volume = inputValue
    setVolume(inputValue)
  }

  const handleClick = () => {
    setShown((current) => !current)
  }

  return (
    <footer class="bottombar">
      <button type="button">
        <MonitorSpeaker class="bottombar__icon" size={24} />
      </button>
      <button type="button" onClick={handleClick}>
        <Volume2 class="bottombar__icon" size={24} />
      </button>
      {shown() && (
        <div class="bottombar__volume-slider">
          <input
            class="bottombar__range"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume()}
            onInput={handleInput}
          />
        </div>
      )}
      <button type="button">
        <Share class="bottombar__icon" size={24} />
      </button>
      <button type="button">
        <ListStart class="bottombar__icon" size={24} />
      </button>
    </footer>
  )
}
