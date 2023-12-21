import Strategy from "./Strategy";
import { Data, Strat } from "../types/types";
import { useState } from "react";

interface Props {
	data: Data[];
	onModify: (strat: string) => void;
	onDelete: (strat: string) => void;
	onCreate: () => void;
}

const StratList = ({ data, onModify, onDelete, onCreate }: Props) => {
	const [currentMap, setCurrentMap] = useState("");

	const strats: Strat[] = [];

	data.forEach((row) => {
		const { pid, pname, sid, sname, role, map } = row;

		if (currentMap == "") {
			setCurrentMap(map);
		}

		if (!strats[sid]) {
			strats[sid] = { sname, map, roles: [] };
		}
		if (role) {
			strats[sid].roles.push({ pid, pname, role });
		}
	});

	console.log(strats);

	return (
		<div>
			<button type="button" className="btn btn-primary" onClick={onCreate}>
				Create Strat
			</button>
			<h1>{currentMap}</h1>
			{Object.values(strats).map((strat) => (
				<Strategy
					key={strat.sname}
					strat={strat as Strat}
					onModify={onModify}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
};

export default StratList;
