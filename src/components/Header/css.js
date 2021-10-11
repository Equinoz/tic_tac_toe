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
		color: "#01A98D",
		textShadow: "1px 1px 1px #0c3742"
	},
	p: {
		padding: "0 1.5rem 0 1.5rem",
		fontSize: "1.5rem",
		color: "#06708E",
		textAlign: "center",

		"& a": {
			color: "#06708E",
			textDecoration: "none",

			"&:hover": {
				fontStyle: "italic"
			}
		}
	},

	"@media (max-width: 600px)": {
		h1: {
			fontSize: "3rem"
		},
		p: {
			fontSize: "1.2rem"
		}
	},

	"@media (max-width: 400px)": {
		p: {
			padding: 0,
			fontSize: "1rem"
		}
	}
});

export default useStyles;
