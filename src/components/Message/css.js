import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	message: {
		margin: "1rem 1rem 1rem 1rem",
		fontSize: "3rem",
		fontWeigth: "bold",
		color: "#06708E",
		textAlign: "center"
	},

	"@media (max-width: 700px)": {
		message: {
			fontSize: "2rem"
		}
	},

	"@media (max-width: 500px)": {
		message: {
			fontSize: "1.5rem"
		}
	}
});

export default useStyles;
