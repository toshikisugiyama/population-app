import React, {useEffect} from 'react'
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

let label: string = ''
const years: Array<string> = []
let series: Array<series> | any = []

function Graph({prefectures, compositions}: {prefectures: Array<responses>, compositions: Array<composition>}) {
	const populationValues: Array<Array<number>> = []
	const compositionDatas = compositions.map((item: composition) => item.data)
	compositionDatas.forEach(element => {
		const populationValue = element.map((item) => item.value)
		populationValues.push(populationValue)
	})
	series = populationValues.map((item) => {
		return {
			type: 'line',
			name: 'a',
			data: item
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
				label = response.data.result.data[0].label
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
			text: label
		},
		xAxis: {
			categories: years
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
