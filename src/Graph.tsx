import React, {useEffect} from 'react'
import './Graph.scss'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
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
interface series {
	type: string,
	name: string,
	data: Array<number>
}

const years: Array<string> = []
function Graph({prefectures, compositions}: {prefectures: Array<responses>, compositions: Array<composition>}) {
	const series: Array<series> | any = compositions.map((composition) => {
		const values = composition.data.map((data) => data.value)
		const prefName = prefectures.find((response) => response.prefCode === composition.prefCode)?.prefName
		return {
			type: 'line',
			name: prefName,
			data: values
		}
	})
	useEffect(() => {
		const resasConfig = {headers: {
			'Content-Type': 'application/json',
			'x-api-key': process.env.REACT_APP_RESAS_API_KEY
		}}
		const url: string = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=1'
		const fetchYears = async () => {
			await axios.get(url, resasConfig).then(response => {
				const yearArrays = response.data.result.data[0].data.map((item: data) => String(item.year))
				yearArrays.forEach((element: string) => {
					years.push(element)
				})
			})
		}
		fetchYears()
	}, [])

	const options: Highcharts.Options = {
    title: {
			text: '都道府県別人口推移'
		},
		chart: {
			animation: {
				duration: 800
			}
		},
		yAxis: {
			title: {
				text: '人口(人)'
			}
		},
		xAxis: {
			categories: years,
			title: {
				text: '年度(年度)'
			}
		},
    series: series
	}

	return (
		<div className="graph">
			<HighchartsReact
        highcharts={Highcharts}
				options={options}
			/>
		</div>
	)
}

export default Graph
