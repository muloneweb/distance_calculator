import React from "react"

export default (p) => {
	return (
		<>
			{ p.saves.map((e,i) => <div key={i} className="result_button" ><div style={{ margin: "0px"}}>{e}</div > <span className="remove_x_button"  key={i.toString()+"a"} onClick={(e) => p.remove(e, i.toString()+"a")}>x</span></div>) }
		</>
	)
}
