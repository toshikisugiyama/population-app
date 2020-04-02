import React from 'react'
import './Prefectures.scss'
import PrefecturesButtonAllSelect from './PrefecturesButtonAllSelect'
import PrefecturesButtonClear from './PrefecturesButtonClear'
import PrefecturesItem from './PrefecturesItem'
interface prefectures {
	prefCode: number,
	prefName: string,
	isSelected: boolean
}
const Prefectures = (
	{
		prefectures,
		setPrefectures,
	}: {
		prefectures: Array<prefectures>,
		setPrefectures: any,
	}
) => {
	const togglePref = (event: any) => {
		const target = event.target
		const clickedTarget = prefectures.find((prefecture: prefectures) => prefecture.prefName === target.id)
		if (clickedTarget) {
			clickedTarget.isSelected = !clickedTarget.isSelected
		}
		const toggledPrefectures = prefectures.map(prefecture => prefecture)
		setPrefectures(toggledPrefectures)
	}

	return (
		<div className="prefecture">
			<h2 className="prefecture-title">都道府県を選択してください</h2>
			<div className="prefecture-buttons">
				<PrefecturesButtonAllSelect
					prefectures={prefectures}
					setPrefectures={setPrefectures}
				/>
				<PrefecturesButtonClear
					prefectures={prefectures}
					setPrefectures={setPrefectures}
				/>
			</div>
			<ul className="prefecture-list">
				{prefectures.map((prefecture: prefectures) => {
					return (
						<li
							className="prefecture-list-item"
							key={prefecture.prefCode}
						>
							<PrefecturesItem
								prefecture={prefecture}
								togglePref={togglePref}
							/>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Prefectures
