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
	const [selectedPref, setSelectedPref] = useState<Array<responses>>([])
	const [compositions, setCompositions] = useState<Array<composition>>([])
	const resasConfig = {headers: {
		'Content-Type': 'application/json',
		'x-api-key': process.env.REACT_APP_RESAS_API_KEY
	}}
	const prefUrl: string = 'https://opendata.resas-portal.go.jp/api/v1/prefectures'

	const compositionLists: Array<composition> = []

	useEffect(() => {
		const fetchPrefecture = async () => {
			await axios.get(prefUrl, resasConfig).then(response => {
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

		const selectedPref: Array<responses> = prefectures.filter((item: responses) => item.isSelected)
		setSelectedPref(selectedPref)

		const fetchComposition = async () => {
			const selectedPrefCodes: Array<number> = selectedPref.map((item: responses): number => item.prefCode)
			const compositionUrls: Array<compositionUrl> = selectedPrefCodes.map((item: number) => {
				return {
					prefCode: item,
					url: `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${item}`
				}
			})

			for (let item of compositionUrls) {
				await axios.get(item.url, resasConfig).then(response => {
					compositionLists.push(response.data.result.data[0])
					compositionLists[compositionLists.length - 1].prefCode = item.prefCode
				})
			}
			setCompositions(compositionLists)
		}
		fetchComposition()
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
				<Graph
					prefectures={selectedPref}
					compositions={compositions}
				/>
			</main>
    </div>
  )
}

export default App
