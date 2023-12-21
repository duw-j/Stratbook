export interface Data {
	pid: number;
	pname: string;
	sid: number;
	sname: string;
	role: string;
	map: string;
}

export interface Strat {
	sname: string;
	map: string;
	roles: Role[];
}

export interface Role {
	pid: number;
	pname: string;
	role: string;
}
