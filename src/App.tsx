import React, { useState, useEffect } from 'react'
import './App.scss'
import Prefectures from './Prefectures'
import Graph from './Graph'
import axios from 'axios'

interface responses {
	prefCode: number,
	prefName: string,
	isSelected: boolean
}
interface composition {
	prefCode: number,
	label: string,
	data: Array<data>
}
interface data {
	year: number,
	value: number
}
interface compositionUrl {
	prefCode: number,
	url: string
}

function App() {

	const [prefectures, setPrefectures] = useState<Array<responses>>([])
	const [compositions, setCompositions] = useState<Array<composition>>([])
	const resasConfig = {headers: {
		'Content-Type': 'application/json',
		'x-api-key': process.env.REACT_APP_RESAS_API_KEY
	}}
	const prefUrl: string = 'https://opendata.resas-portal.go.jp/api/v1/prefectures'
	const fetchPrefecture = async () => {
		await axios.get(prefUrl, resasConfig).then(response => {
			const prefList: Array<responses> = response.data.result.map((item: responses) => {
				return {
					prefCode: item.prefCode,
					prefName: item.prefName,
					isSelected: false
				}
			})
			setPrefectures(prefList)
		})
	}

	useEffect(() => {
		fetchPrefecture()
		// eslint-disable-next-line
	}, [])

	const selectPref = async (event: Array<responses>) => {
		setPrefectures(event)

		const selectedPref: Array<responses> = prefectures.filter((item: responses) => item.isSelected)

		const compositionUrls: Array<compositionUrl> = selectedPref.map((item: responses) => {
			return {
				prefCode: item.prefCode,
				url: `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${item.prefCode}`
			}
		})

		const compositionLists: Array<composition> = []
		for (let compositionUrl of compositionUrls) {
			await axios.get(compositionUrl.url, resasConfig).then(response => {
				compositionLists.push(response.data.result.data[0])
				compositionLists[compositionLists.length - 1].prefCode = compositionUrl.prefCode
			})
		}
		setCompositions(compositionLists)
	}

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-header-title">都道府県別人口推移</h1>
      </header>
			<main className="App-main">
				<Prefectures
					prefectures={prefectures}
					selectPref={selectPref}
					setPrefectures={setPrefectures}
					setCompositions={setCompositions}
				/>
				<Graph
					prefectures={prefectures}
					compositions={compositions}
				/>
			</main>
    </div>
  )
}

export default App
