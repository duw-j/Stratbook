import { useState } from "react";

interface Props {
	onClick: (id: number, map: string) => void;
}

const MapList = ({ onClick }: Props) => {
	const [selectedIndex, setSelectedIndex] = useState(-1);

	return (
		<ul className="list-group">
			<li
				className={
					selectedIndex === 1 ? "list-group-item active" : "list-group-item"
				}
				id="1"
				onClick={() => {
					onClick(1, "Ancient");
					setSelectedIndex(1);
				}}
			>
				Ancient
			</li>

			<li
				className={
					selectedIndex === 2 ? "list-group-item active" : "list-group-item"
				}
				id="2"
				onClick={() => {
					onClick(2, "Anubis");
					setSelectedIndex(2);
				}}
			>
				Anubis
			</li>

			<li
				className={
					selectedIndex === 3 ? "list-group-item active" : "list-group-item"
				}
				id="3"
				onClick={() => {
					onClick(3, "Inferno");
					setSelectedIndex(3);
				}}
			>
				Inferno
			</li>

			<li
				className={
					selectedIndex === 4 ? "list-group-item active" : "list-group-item"
				}
				id="4"
				onClick={() => {
					onClick(4, "Mirage");
					setSelectedIndex(4);
				}}
			>
				Mirage
			</li>

			<li
				className={
					selectedIndex === 5 ? "list-group-item active" : "list-group-item"
				}
				id="5"
				onClick={() => {
					onClick(5, "Nuke");
					setSelectedIndex(5);
				}}
			>
				Nuke
			</li>

			<li
				className={
					selectedIndex === 6 ? "list-group-item active" : "list-group-item"
				}
				id="6"
				onClick={() => {
					onClick(6, "Overpass");
					setSelectedIndex(6);
				}}
			>
				Overpass
			</li>

			<li
				className={
					selectedIndex === 7 ? "list-group-item active" : "list-group-item"
				}
				id="7"
				onClick={() => {
					onClick(7, "Vertigo");
					setSelectedIndex(7);
				}}
			>
				Vertigo
			</li>
		</ul>
	);
};

export default MapList;
