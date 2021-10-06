import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	button: {
		backgroundColor: "#03C490",
		height: "4.5rem",
		width: "11rem",
		lineHeight: "4.5rem",
		fontSize: "1.6rem",
		textAlign: "center",
		verticalAlign: "middle",
		color: "#0c3742",
		fontWeight: "semibold",
		borderRadius: 25,
		boxShadow: "3px 3px 3px #072a33",
		cursor: "pointer",
		transition: "ease-out 0.5s",

		"&:hover": {
			backgroundColor: "#06708E",
			color: "#ededdf",
			boxShadow: "1px 1px 1px #0c3742",
		},

		"&:active": {
			boxShadow: "none"
		}
	}
});

export default useStyles;
