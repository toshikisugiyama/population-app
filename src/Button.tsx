import React from 'react'
import './Button.scss'
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
const compositionLists: Array<composition> = []
const Button = (
	{name, prefectures, clickButton, setPrefectures, setCompositions}: {name: string, prefectures: Array<responses>, clickButton: any, setPrefectures: any, setCompositions: any}
) => {
	const selectAll = async () => {
		const selectAllPrefectures: Array<responses> = prefectures.map((prefecture: responses) => {
			return {
				prefCode: prefecture.prefCode,
				prefName: prefecture.prefName,
				isSelected: true
			}
		})
		setPrefectures(selectAllPrefectures)
		const resasConfig = {headers: {
			'Content-Type': 'application/json',
			'x-api-key': process.env.REACT_APP_RESAS_API_KEY
		}}
		const compositionUrls: Array<compositionUrl> = prefectures.map((prefecture: responses) => {
			return {
				prefCode: prefecture.prefCode,
				url: `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefecture.prefCode}`
			}
		})
		for (let compositionUrl of compositionUrls) {
			await axios.get(compositionUrl.url, resasConfig).then(response => {
				compositionLists.push(response.data.result.data[0])
				compositionLists[compositionLists.length - 1].prefCode = compositionUrl.prefCode
			})
		}
		setCompositions(compositionLists)
	}
	const clearSelection = () => {
		const clearedPrefectures: Array<responses> = prefectures.map((prefecture: responses) => {
			return {
				prefCode: prefecture.prefCode,
				prefName: prefecture.prefName,
				isSelected: false
			}
		})
		setPrefectures(clearedPrefectures)
		setCompositions([])
	}
	return(
		<button
			className={name}
			onClick={name==='all'? selectAll: clearSelection}
		>
			{name==='all'?'すべて選択': 'クリア'}
		</button>
	)
}

export default Button
