import { createUseStyles } from "react-jss";

import { Status } from "../../enums";

const useStyles = createUseStyles({
	startButtons: (status: Status) => ({
		height: (status === Status.Init) ? "8rem" : 0,
		width: "25rem",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		margin: (status === Status.Init) ? "1rem 0 1rem 0" : 0,
		boxSizing: "border-box",
		overflow: "hidden",
		transition: "height 0.5s ease-out"
	}),
	h2: {
		fontSize: "1.9rem",
		color: "#06708E"
	},
	buttons: (status: number) => ({
		width: "97%",
		height: (status === Status.Init) ? "5rem" : 0,
		display: "flex",
		justifyContent: "space-between"
	}),

	"@media (max-width: 550px)": {
		startButtons: (status: number) => ({
			height: (status === Status.Init) ? "7rem" : 0,
			width: "19rem",
		}),
		h2: {
			fontSize: "1.6rem",
		},
		buttons: (status: number) => ({
			height: (status === Status.Init) ? "4em" : 0,
		})
	},

	"@media (max-width: 400px)": {
		startButtons: () => ({
			width: "17rem",
		})
	}
});

export default useStyles;
