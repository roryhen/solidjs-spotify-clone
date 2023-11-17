import "solid-devtools"
import "./app.css"
import type { Component } from "solid-js"
import { createSignal, createEffect, Show, onMount, onCleanup } from "solid-js"
import albumart from "./assets/albumart.svg"
import { AlbumCover } from "./components/AlbumCover"
import { TopBar } from "./components/TopBar"
import { SongInfo } from "./components/SongInfo"
import { Player } from "./components/Player"
import { Controls } from "./components/Controls"
import { BottomBar } from "./components/BottomBar"

const audioSrc =
  "https://storage.googleapis.com/canofworms/audio/saythat-toroymoi.mp3"

export const App: Component = () => {
  const [currentTime, setCurrentTime] = createSignal(0)
  const [duration, setDuration] = createSignal(0)
  const [audioTrack, setAudioTrack] = createSignal<HTMLAudioElement>()

  const timeUpdate = () => {
    setCurrentTime(Math.floor(audioTrack()?.currentTime || 0))
  }

  const metadataUpdate = () => {
    setDuration(Math.floor(audioTrack()?.duration || 0))
  }

  onMount(() => {
    const track = audioTrack()
    if (track) {
      track.volume = 0.1
      track.addEventListener("timeupdate", timeUpdate)
      track.addEventListener("loadedmetadata", metadataUpdate)
    }

    onCleanup(() => {
      track?.removeEventListener("timeupdate", timeUpdate)
      track?.addEventListener("loadedmetadata", metadataUpdate)
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
          <audio ref={setAudioTrack} src={audioSrc} preload="metadata">
            <a href={audioSrc}>Download audio</a>
          </audio>
          <Player
            currentTime={currentTime()}
            setCurrentTime={setCurrentTime}
            audioTrack={audioTrack()}
            audioSrc={audioSrc}
            duration={duration()}
          />
          <Controls audioTrack={audioTrack()} />
          <BottomBar audioTrack={audioTrack()} />
        </div>
      </div>
    </div>
  )
}
