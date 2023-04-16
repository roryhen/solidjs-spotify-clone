import type { Component } from "solid-js"
import { Play, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-solid"
import "./controls.css"

type Props = {}

export const Controls: Component<Props> = (props) => {
  return (
    <div class="controls">
      <button class="controls__btn" type="button">
        <Shuffle class="controls__icon" />
      </button>
      <button class="controls__btn controls__skip" type="button">
        <SkipBack class="controls__icon" />
      </button>
      <button class="controls__btn controls__play" type="button">
        <Play class="controls__icon" />
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
