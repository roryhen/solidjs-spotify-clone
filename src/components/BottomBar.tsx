import type { Component } from "solid-js"
import { ListStart, MonitorSpeaker, Share } from "lucide-solid"
import "./bottombar.css"

type Props = {}

export const BottomBar: Component<Props> = () => {
  return (
    <footer class="bottombar">
      <button type="button">
        <MonitorSpeaker class="bottombar__icon" size={24} />
      </button>
      <button type="button">
        <Share class="bottombar__icon" size={24} />
      </button>
      <button type="button">
        <ListStart class="bottombar__icon" size={24} />
      </button>
    </footer>
  )
}
