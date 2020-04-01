import React from 'react'
import './Button.scss'
interface prefectures {
	prefCode: number,
	prefName: string,
	isSelected: boolean
}
const ButtonAllSelect = (
	{
		prefectures,
		setPrefectures
	}: {
		prefectures: Array<prefectures>,
		setPrefectures: any
	}
) => {
	const clickButton = () => {
		const selectAllPrefectures: Array<prefectures> = prefectures.map((prefecture: prefectures) => {
			return {
				prefCode: prefecture.prefCode,
				prefName: prefecture.prefName,
				isSelected: true
			}
		})
		setPrefectures(selectAllPrefectures)
	}

	return(
		<button
			className="all"
			onClick={clickButton}
		>
			すべて選択
		</button>
	)
}

export default ButtonAllSelect
