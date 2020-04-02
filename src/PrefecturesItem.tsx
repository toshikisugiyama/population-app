import React from 'react'
import './PrefecturesItem.scss'
interface prefectures {
	prefCode: number,
	prefName: string,
	isSelected: boolean
}
const PrefecturesItem = (
	{
		prefecture,
		togglePref
	}: {
		prefecture: prefectures,
		togglePref: any
	}
) => {
	return(
		<label>
			<input
				type="checkbox"
				checked={prefecture.isSelected}
				id={prefecture.prefName}
				onChange={togglePref}
			/>
			{prefecture.prefName}
		</label>
	)
}

export default PrefecturesItem
