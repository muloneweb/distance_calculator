import './App.css';
import React from "react"
import Converter from './Components/Converter.js';


function App() {
	return (
		<div className="App">
			<div className="header_border_div"></div>
			<div className="central_div">
				<Converter />
			</div>
			<div className="footer">
				<p style={{ margin: "0px" }}>Terms of service</p>
				<div style={{ width: "20px" }}></div>
				<p style={{ margin: "0px" }}>Privacy policy </p>
			</div>
		</div>
	);
}

export default App;
