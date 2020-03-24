import React, { useState, useEffect } from 'react'
import './App.scss'
import Prefectures from './Prefectures'
import Graph from './Graph'
import axios from 'axios'

function App() {

	// 都道府県名取得
	interface responses {
		prefCode: number,
		prefName: string,
		isSelected: boolean
	}
	const prefConfig = {headers: {
		'Content-Type': 'application/json',
		'x-api-key': process.env.REACT_APP_RESAS_API_KEY
	}}
	const prefUrl: string = 'https://opendata.resas-portal.go.jp/api/v1/prefectures'
	const [prefectures, setPrefectures] = useState<Array<responses>>([])
	useEffect(() => {
		const fetchPrefecture = async () => {
			await axios.get(prefUrl, prefConfig).then(response => {
				const prefList: Array<responses> = response.data.result.map((item: responses) => item)
				prefList.forEach((item: responses) => {
					item.isSelected = false
				});
				setPrefectures(prefList)
			})
		}
		fetchPrefecture()
		// eslint-disable-next-line
	}, [])

	const selectPref = (event: Array<responses>) => {
		setPrefectures(event)
		console.log(prefectures)
	}

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-header-title">Title</h1>
      </header>
			<main className="App-main">
				<Prefectures
					prefectures={prefectures}
					selectPref={(event: Array<responses>) => selectPref(event)}
				/>
				<Graph />
			</main>
    </div>
  )
}

export default App
