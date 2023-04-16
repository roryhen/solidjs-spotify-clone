import type { Component, JSX } from "solid-js"
import { ChevronDown, MoreHorizontal } from "lucide-solid"
import "./topbar.css"

type Props = {
  children: JSX.Element
}

export const TopBar: Component<Props> = (props) => {
  return (
    <header class="topbar">
      <button type="button">
        <ChevronDown class="topbar__icon" size={24} />
      </button>
      {props.children}
      <button type="button">
        <MoreHorizontal class="topbar__icon" size={24} />
      </button>
    </header>
  )
}
