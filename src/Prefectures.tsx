import React from 'react'
import './Prefectures.scss'
interface responses {
	prefCode: number,
	prefName: string,
	isSelected: boolean
}
function Prefectures({prefectures, selectPref}: {prefectures: Array<responses>, selectPref: any}) {
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
			<h2 className="prefecture-title">都道府県リスト</h2>
			<ul className="prefecture-list">
				{prefectures.map((item) => {
					return (
						<li className="prefecture-list-item" key={item.prefCode}>
							<label>
								<input type="checkbox" id={item.prefName} onChange={togglePref}/>
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
