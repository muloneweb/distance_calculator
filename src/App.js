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
		</div>
	);
}

export default App;
