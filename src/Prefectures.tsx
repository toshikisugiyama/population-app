import React from 'react'
import './Prefectures.scss'
import ButtonAllSelect from './ButtonAllSelect'
import ButtonClear from './ButtonClear'
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
				<ButtonAllSelect
					prefectures={prefectures}
					setPrefectures={setPrefectures}
				/>
				<ButtonClear
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
							<label>
								<input
									type="checkbox"
									checked={prefecture.isSelected}
									id={prefecture.prefName}
									onChange={togglePref}
								/>
								{prefecture.prefName}
							</label>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Prefectures
