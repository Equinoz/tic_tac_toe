type State = {
	status: Status,
	message: string,
	playerFirst: Boolean,
	match?: Match,
	moveAllowed: Boolean
};

type Context = {
	state: State,
	setState: (s: State) => void
};
