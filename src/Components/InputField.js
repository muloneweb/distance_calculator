import React from "react"

export default (p) => {
	return (
		<div className="input_scale_wrap">
			<input id="numb_input" type="text" onChange={p.MakeCalc} value={p.value} maxlength="9" /> <span className="input_scale" style={{ width: "70px", textAlign: "left", verticalAlign: "bottom", fontWeight: "400" }}>{p.inputScale}</span>
		</div>
	)
}
