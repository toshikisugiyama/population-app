import React, { useState, useEffect } from 'react'
import './Prefectures.scss'
import axios from 'axios'

interface responses {
	prefCode: number,
	prefName: string
}

function Prefectures() {
	const config = {headers: {
		'Content-Type': 'application/json',
		'x-api-key': process.env.REACT_APP_RESAS_API_KEY
	}}
	const prefectures_url: string = 'https://opendata.resas-portal.go.jp/api/v1/prefectures'
	const [prefectures, setPrefectures] = useState([])
	useEffect(() => {
		const fetchPrefecture = async () => {
			await axios.get(prefectures_url, config).then(response => {
				const p = response.data.result.map((item: responses) => item.prefName)
				setPrefectures(p)
			})
		}
		fetchPrefecture()
		// eslint-disable-next-line
	}, [])
	return (
		<div className="prefecture">
			<h2 className="prefecture-title">都道府県リスト</h2>
			<ul className="prefecture-list">
				{prefectures.map((prefName) => {
					return (
						<li className="prefecture-list-item" key={prefName}>
							<input type="checkbox" id={prefName}/>
							<label htmlFor={prefName}>{prefName}</label>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Prefectures
