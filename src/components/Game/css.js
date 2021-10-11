import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	game: {
		backgroundColor: "green",
		height: 500,
		width: 500,
		marginBottom: "2rem"
	},

	"@media (max-width: 550px)": {
		game: {
			height: 350,
			width: 350
		}
	},

	"@media (max-width: 400px)": {
		game: {
			height: 250,
			width: 250
		}
	}
});

export default useStyles;
