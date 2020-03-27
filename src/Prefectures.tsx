import React from 'react'
import './Prefectures.scss'
import Button from './Button'
interface responses {
	prefCode: number,
	prefName: string,
	isSelected: boolean
}
const Prefectures = ({prefectures, selectPref, setPrefectures, setCompositions}: {prefectures: Array<responses>, selectPref: any, setPrefectures: any, setCompositions: any}) => {
	const togglePref = (event: any) => {
		const target = event.target
		const clickedTarget = prefectures.find((item: responses) => item.prefName === target.id)
		if (clickedTarget) {
			clickedTarget.isSelected = !clickedTarget.isSelected
		}
		selectPref(prefectures)
	}

	return (
		<div className="prefecture">
			<h2 className="prefecture-title">都道府県を選択してください</h2>
			<div className="prefecture-buttons">
				<Button
					name='all'
					prefectures={prefectures}
					clickButton={selectPref}
					setPrefectures={setPrefectures}
					setCompositions={setCompositions}
				/>
				<Button
					name='clear'
					prefectures={prefectures}
					clickButton={selectPref}
					setPrefectures={setPrefectures}
					setCompositions={setCompositions}
				/>
			</div>
			<ul className="prefecture-list">
				{prefectures.map((item: responses) => {
					return (
						<li className="prefecture-list-item" key={item.prefCode}>
							<label>
								<input
									type="checkbox"
									checked={item.isSelected}
									id={item.prefName}
									onChange={togglePref}
								/>
								{item.prefName}
							</label>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Prefectures
