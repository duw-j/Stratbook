import { Strat } from "../types/types";

interface Props {
	strat: Strat;
	onModify: (strat: string) => void;
	onDelete: (strat: string) => void;
}

const Strat = ({ strat, onModify, onDelete }: Props) => {
	console.log(strat);
	const { sname, roles } = strat;

	return (
		<div>
			<h3>{sname}</h3>
			<ul className="no-bullets">
				{roles.map((role, index) => (
					<li key={index}>
						<strong>{role.pname}:</strong> {role.role}
					</li>
				))}
			</ul>
			<button
				type="button"
				className="btn btn-primary"
				onClick={() => onModify(sname)}
			>
				Modify
			</button>
			<button
				type="button"
				className="btn btn-secondary"
				onClick={() => onDelete(sname)}
			>
				Delete
			</button>
		</div>
	);
};

export default Strat;
