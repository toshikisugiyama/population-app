import React, {useEffect} from 'react'
import './Graph.scss'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface prefectures {
	prefCode: number,
	prefName: string,
	isSelected: boolean
}
interface populations {
	prefCode: number,
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

const Graph = (
	{
		prefectures,
		populations,
	}: {
		prefectures: Array<prefectures>,
		populations: Array<populations>,
	}
) => {
	const selectedPref = prefectures.filter((prefecture: prefectures) => prefecture.isSelected)
	const selectedPrefCode = selectedPref.map(prefecture => prefecture.prefCode)
	const selectedPopulations = populations.filter(population => selectedPrefCode.includes(population.prefCode))
	const series: Array<series> | any = selectedPopulations.map((population) => {
		const values = population.data.map((data) => data.value)
		const prefName = selectedPref.find((response) => response.prefCode === population.prefCode)?.prefName
		return {
			type: 'line',
			name: prefName,
			data: values
		}
	})
	useEffect(() => {
		if (populations[0] !== undefined) {
			for (const year of populations[0].data.map(item => String(item.year))) {
				years.push(year)
			}
		}
	}, [populations])
	const options: Highcharts.Options = {
    title: {
			text: '都道府県別人口推移'
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
