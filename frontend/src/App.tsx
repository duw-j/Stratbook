import { useState } from "react";
import "./App.css";
import MapList from "./components/MapList";
import StratList from "./components/StratList";
import { Data } from "./types/types";

function App() {
	const [data, setData] = useState<Data[]>([]);

	const fetchStrats = async (mapID: number) => {
		try {
			const response = await fetch("http://127.0.0.1:3000/strat/map/" + mapID);
			const result = await response.json();
			setData(result.result);
		} catch (error) {
			console.error("Error fetching data: ", error);
		}
	};

	const handleSelectMap = (mapID: number) => {
		fetchStrats(mapID);
	};

	const handleModify = (strat: string) => {
		console.log("modify: " + strat);
	};

	const handleDelete = (strat: string) => {
		console.log("delete: " + strat);
	};

	const handleCreate = () => {
		console.log("create strat");
	};

	return (
		<>
			<div className="custom-container">
				<div className="row">
					<div className="col-md-3 col-lg-3 ml-md-0">
						<MapList onClick={handleSelectMap} />
					</div>
					<div className="col-md-9 col-lg-9">
						<StratList
							data={data}
							onModify={handleModify}
							onDelete={handleDelete}
							onCreate={handleCreate}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
