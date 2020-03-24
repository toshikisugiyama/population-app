import React from 'react'
interface responses {
	prefCode: number,
	prefName: string,
	isSelected: boolean
}
function Graph({prefectures}: {prefectures: Array<responses>}) {
	return (
		<div>
			{prefectures.map((item: responses) => item.prefCode)}
		</div>
	)
}

export default Graph
