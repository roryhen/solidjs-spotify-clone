import type { Component } from "solid-js"
import "./albumcover.css"

type Props = {
  title: string
  url: string
}

export const AlbumCover: Component<Props> = (props) => {
  return (
    <div class="albumcover">
      <img class="albumcover__image" src={props.url} alt={props.title} />
    </div>
  )
}
