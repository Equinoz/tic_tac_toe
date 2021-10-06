import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	startButtons: {
		height: "7.5rem",
		width: "25rem",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		margin: "1rem 0 1rem 0",
	},
	h2: {
		fontSize: "1.9rem",
		color: "#06708E"
	},
	buttons: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between"
	}
});

export default useStyles;
