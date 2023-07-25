import "solid-devtools"
import "./app.css"
import type { Component } from "solid-js"
import { createSignal, onMount, onCleanup } from "solid-js"
import albumart from "./assets/albumart.svg"
import { AlbumCover } from "./components/AlbumCover"
import { TopBar } from "./components/TopBar"
import { SongInfo } from "./components/SongInfo"
import { Player } from "./components/Player"
import { Controls } from "./components/Controls"
import { BottomBar } from "./components/BottomBar"

export const App: Component = () => {
  const [currentTime, setCurrentTime] = createSignal(0)
  const [audioTrack, setAudioTrack] = createSignal<HTMLAudioElement>()

  const timeUpdate = () => {
    setCurrentTime(Math.floor(audioTrack().currentTime))
  }

  onMount(() => {
    audioTrack().addEventListener("timeupdate", timeUpdate)

    onCleanup(() => {
      audioTrack().removeEventListener("timeupdate", timeUpdate)
    })
  })

  return (
    <div class="app">
      <TopBar>
        <h1 class="app__heading">Daily Mix 1</h1>
      </TopBar>
      <div class="app__panel">
        <AlbumCover title="Anything in Return by Toro y moi" url={albumart} />
        <SongInfo title="Say That" artist="Toro y Moi" />
        <div class="app__controls">
          <Player
            currentTime={currentTime()}
            setCurrentTime={setCurrentTime}
            audioTrack={audioTrack}
            setAudioTrack={setAudioTrack}
            duration={audioTrack() ? Math.floor(audioTrack().duration) : 0}
            audioSrc="https://storage.googleapis.com/canofworms/audio/saythat-toroymoi.mp3"
          />
          <Controls audioTrack={audioTrack()} />
          <BottomBar audioTrack={audioTrack()} />
        </div>
      </div>
    </div>
  )
}
