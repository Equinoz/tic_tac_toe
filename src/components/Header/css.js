import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	header: {
		margin: "2rem 0 1.4rem 0",
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	h1: {
		marginBottom: "0.8rem",
		fontSize: "5rem",
		fontWeight: "bold",
		color: "#01A98D"
	},
	p: {
		fontSize: "1.5rem",
		color: "#06708E",

		"& a": {
			color: "#06708E",
			textDecoration: "none",

			"&:hover": {
				fontStyle: "italic"
			}
		}
	}
});

export default useStyles;
