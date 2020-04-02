import React from 'react'
import './PrefecturesButton.scss'
interface prefectures {
	prefCode: number,
	prefName: string,
	isSelected: boolean
}
const PrefecturesButtonClear = (
	{
		setPrefectures,
		prefectures
	}: {
		setPrefectures: any,
		prefectures: Array<prefectures>
	}
) => {
	const clickButton = () => {
		const clearedPrefectures: Array<prefectures> = prefectures.map((prefecture: prefectures) => {
			return {
				prefCode: prefecture.prefCode,
				prefName: prefecture.prefName,
				isSelected: false
			}
		})
		setPrefectures(clearedPrefectures)
	}
	return (
		<button
			className="clear"
			onClick={clickButton}
		>
			クリア
		</button>
	)
}

export default PrefecturesButtonClear
