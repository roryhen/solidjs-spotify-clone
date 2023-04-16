import type { Component } from "solid-js"
import "./songinfo.css"

type Props = {
  title: string
  artist: string
}

export const SongInfo: Component<Props> = (props) => {
  return (
    <div class="songinfo">
      <h2 class="songinfo__title">{props.title}</h2>
      <p class="songinfo__artist">{props.artist}</p>
    </div>
  )
}
