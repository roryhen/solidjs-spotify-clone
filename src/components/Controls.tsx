import type { Component } from "solid-js"
import { createSignal, createEffect, onMount, onCleanup } from "solid-js"
import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-solid"
import "./controls.css"

type Props = {
  audioTrack?: HTMLAudioElement
}

export const Controls: Component<Props> = (props) => {
  const [playing, setPlaying] = createSignal(false)

  const handleClick = () => {
    setPlaying((current) => !current)
  }

  createEffect(() => {
    if (playing()) {
      props.audioTrack?.play()
    } else {
      props.audioTrack?.pause()
    }
  })

  const trackEnded = () => {
    setPlaying(false)
  }

  onMount(() => {
    const track = props.audioTrack
    track?.addEventListener("ended", trackEnded)

    onCleanup(() => {
      track?.removeEventListener("ended", trackEnded)
    })
  })

  return (
    <div class="controls">
      <button class="controls__btn" type="button">
        <Shuffle class="controls__icon" />
      </button>
      <button class="controls__btn controls__skip" type="button">
        <SkipBack class="controls__icon" />
      </button>
      <button
        class="controls__btn controls__play"
        type="button"
        onClick={handleClick}
      >
        {playing() ? (
          <Pause class="controls__icon" />
        ) : (
          <Play class="controls__icon controls__icon--play" />
        )}
      </button>
      <button class="controls__btn controls__skip" type="button">
        <SkipForward class="controls__icon" />
      </button>
      <button class="controls__btn" type="button">
        <Repeat class="controls__icon" />
      </button>
    </div>
  )
}
