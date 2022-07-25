
import React from "react"
import { useState } from 'react'
import Scales from './Scales.js';
import InputField from './InputField.js';
import ResultField from './ResultField.js';
import SaveData from './SaveData.js';


export default (p) => {
	const [saved, setSaved] = useState([])
	const [inputScale, setInputScale] = useState("km")
	const [resultScale, setResultScale] = useState("miles")
	const [scale, setScale] = useState("km_miles")
	const [inputValue, setInputValue] = useState()
	const [result, setResult] = useState()

	let scalesOpposites = {
		km_miles: "miles_km",
		miles_km: "km_miles",
		feet_meter: "meter_feet",
		meter_feet: "feet_meter",
		cm_inches: "inches_cm",
		inches_cm: "cm_inches"
	}

	function cleanInput(e) {
		let value = e.target.value.replace(/[^0-9]/gi, "")
		makeCalc(value)
	}


	function makeCalc(e) {
		setInputValue(e)

		switch (scale) {
			case "km_miles":
				setResult((Number(e) * 0.62137).toFixed(2))
				break
			case "miles_km":
				setResult((Number(e) * 1.6).toFixed(2))
				break
			case "feet_meter":
				setResult((Number(e) * 0.3048).toFixed(2))
				break
			case "meter_feet":
				setResult((Number(e) * 3.28).toFixed(2))
				break
			case "cm_inches":
				setResult((Number(e) / 2.54).toFixed(2))
				break
			case "inches_cm":
				setResult((Number(e) * 2.54).toFixed(2))
				break
		}
	}

	function changeScale(e) {
		let scalesArray = e.target.value.split("_")
		setScale(e.target.value)
		setInputScale(scalesArray[0])
		setResultScale(scalesArray[1])
		if (e.target.value != "")
			makeCalc(inputValue)
	}

	function swap(e) {
		const frominputScale = inputScale
		const fromresultScale = resultScale
		const fromValue = inputValue
		const fromResult = result
		const swapScale = scalesOpposites[scale]
		setScale(swapScale)
		setInputScale(fromresultScale)
		setResultScale(frominputScale)
		setResult(fromValue)
		setInputValue(fromResult)
	}

	async function save() {
		let current = `${inputValue} ${inputScale} → ${result} ${resultScale}`
		if (current != saved[saved.length - 1] && inputValue != "" && result != "" && inputValue != undefined) {
			let array = saved
			array.push(current)
			setSaved(prev => [...array])
		}
		setInputValue("")
		setResult("")
		document.getElementById("numb_input").focus();

		fetch(`/data/add`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ value: current })
		})
	}

	function remove(e, k) {
		let check = []
		check.push(e.target.parentNode.innerText)
		let str = check[0].slice(0, -2);
		saved.forEach(i => console.log(i != str))
		setSaved(saved.filter(i => i != str))

		fetch(`/data/delete`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ value: str })
		})
	}

	return (
		<div className="main_container" >
			<p className="header"  >⇄    unit converter </p>
			<div className="converter_div">
				<p className="convert_header">convert</p>
				<div className="tbl">
					<div className="input_wrapper">
						<div className="scale_th" style={{ display: "inline-flex" }} ><Scales ChangeScale={changeScale} Swap={swap} /></div>
						<div style={{ minWidth: "10%" }}></div>
						<div className="input_field" style={{ marginLeft: "auto", textAlign: "right" }}><InputField MakeCalc={cleanInput} value={inputValue} inputScale={inputScale} tabindex="3" /></div>
					</div>
					<div style={{ height: "20px" }}> </div>
				</div>
				<div className="results_container" style={{ height: "40px" }}>
					<div style={{ verticalAlign: "bottom" }}><div className="heart" tabindex="4" onClick={save} >♡</div></div>
					<div style={{ minWidth: "10%" }}></div>
					<div style={{ marginRight: "10px", marginLeft: "auto", verticalAlign: "bottom" }}> <ResultField result={result} /></div>
					<div style={{ verticalAlign: "bottom" }}> <div style={{ width: "70px", textAlign: "left", fontWeight: "bold", fontSize: "18px" }}>{resultScale}</div></div>
				</div>
			</div>
			<div className="saved_results">
				<SaveData saves={saved} remove={remove} />
			</div>
			<div className="footer">
				<p>Terms of service</p>
				<div style={{ width: "20px" }}></div>
				<p>Privacy policy </p>
			</div>
		</div>
	)

}
