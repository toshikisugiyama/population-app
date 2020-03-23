import React from 'react'
import './App.scss'
import Prefectures from './Prefectures'
import Graph from './Graph'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-header-title">Title</h1>
      </header>
			<main className="App-main">
				<Prefectures />
				<Graph />
			</main>
    </div>
  )
}

export default App
