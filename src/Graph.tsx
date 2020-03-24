import React from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
interface responses {
	prefCode: number,
	prefName: string,
	isSelected: boolean
}
function Graph({prefectures}: {prefectures: Array<responses>}) {
	const options: Highcharts.Options = {
    title: {
        text: 'My chart'
    },
    series: [
			{
        type: 'line',
        data: [1, 2, 3]
			},
			{
        type: 'line',
        data: [1, 3, 2]
			}
		]
	}
	return (
		<div>
			{prefectures.map((item: responses) => item.prefCode)}
			<HighchartsReact
        highcharts={Highcharts}
				options={options}
    />
		</div>
	)
}

export default Graph
