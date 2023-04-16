import type { Component } from "solid-js"
import "./app.css"
import { AlbumCover } from "./components/AlbumCover"
import { TopBar } from "./components/TopBar"
import { SongInfo } from "./components/SongInfo"
import albumart from "./assets/albumart.svg"
import { Player } from "./components/Player"
import { Controls } from "./components/Controls"
import { createSignal } from "solid-js"
import { BottomBar } from "./components/BottomBar"

export const App: Component = () => {
  const [currentTime, setCurrentTime] = createSignal(5)

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
            currentTimeSeconds={currentTime()}
            totalTimeSeconds={120}
            audioSrc={""}
            setCurrentTime={setCurrentTime}
          />
          <Controls />
          <BottomBar />
        </div>
      </div>
    </div>
  )
}
