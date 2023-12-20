import { useState, useEffect } from "react";
import "./App.css";
import MapList from "./components/MapList";

interface Strat {
	id: number;
	name: string;
}

function App() {
	const [data, setData] = useState<Strat[] | null>(null);
	const [currentMapID, setCurrentMapID] = useState(-1);
	const [currentMap, setCurrentMap] = useState("");

	useEffect(() => {
		fetchData(currentMapID);
	}, [currentMapID]);

	const fetchData = async (mapID: number) => {
		try {
			const response = await fetch("http://127.0.0.1:3000/strat/map/" + mapID);
			const result = await response.json();
			setData(result.result);
		} catch (error) {
			console.error("Error fetching data: ", error);
		}
	};

	const handleSelectMap = (mapID: number, map: string) => {
		setCurrentMapID(mapID);
		setCurrentMap(map);
	};

	return (
		<>
			<div>
				<MapList onClick={handleSelectMap} />
			</div>
			<div> {currentMapID} </div>
			{data && (
				<div>
					<h2>{currentMap}</h2>
					<ul>
						{data.map((strat) => (
							<li key={strat.id}>{strat.name}</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
}

export default App;
