import { createUseStyles } from "react-jss";

import board from "./board.jpg";

const useStyles = createUseStyles({
	game: (moveAllowed: Boolean) => ({
		backgroundImage: `url(${board})`,
		height: 500,
		width: 500,
		margin: "1rem 0 2rem 0",
		border: "1px solid #0c3742",
		borderRadius: "2.5rem",
		boxShadow: "2px 2px 3px #0d5466",
		cursor: (moveAllowed) ? "pointer" : "auto",
		"-webkit-tap-highlight-color": "transparent"
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
