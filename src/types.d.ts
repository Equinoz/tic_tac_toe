type State = {
	status: Status,
	message: string,
	playerFirst: Boolean,
	match?: Match
};

type Context = {
	state: State,
	setState: (s: State) => void
};
