import React from "react"

export default (p) => {
	return (
		<>
			<select className="option" onChange={p.ChangeScale} tabindex="1">
				<option className="values" value="km_miles">km → miles</option>
				<option className="values" value="miles_km">miles → km</option>
				<option className="values" value="feet_meter">feet → meter</option>
				<option className="values" value="meter_feet">meter → feet</option>
				<option className="values" value="cm_inches">cm → inches</option>
				<option className="values" value="inches_cm">inches → cm</option>
			</select> <span className="invert" onClick={p.Swap} style={{ marginLeft: "10px" }} tabindex="2">⇄</span>
		</>
	)
}
