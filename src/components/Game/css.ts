import { createUseStyles } from "react-jss";

import { Status } from "../../enums";

import board from "./board.jpg";

const useStyles = createUseStyles({
	game: (status: number) => ({
		backgroundImage: `url(${board})`,
		height: 500,
		width: 500,
		margin: "1rem 0 2rem 0",
		border: "1px solid #0c3742",
		borderRadius: "2.5rem",
		boxShadow: "2px 2px 3px #0d5466",
		cursor: (status === Status.Started) ? "pointer" : "auto"
	}),

	"@media (max-width: 550px)": {
		game: () => ({
			height: 350,
			width: 350
		})
	},

	"@media (max-width: 400px)": {
		game: () => ({
			height: 250,
			width: 250
		})
	}
});

export default useStyles;
