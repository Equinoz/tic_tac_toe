import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	startButtons: (props: { state: number }) => ({
		height: (props.state === 0) ? "8rem" : 0,
		width: "25rem",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		margin: (props.state === 0) ? "1rem 0 1rem 0" : 0,
		boxSizing: "border-box",
		overflow: "hidden",
		transition: "height 0.5s ease-out"
	}),
	h2: {
		fontSize: "1.9rem",
		color: "#06708E"
	},
	buttons: (props: { state: number }) => ({
		width: "97%",
		height: (props.state === 0) ? "5rem" : 0,
		display: "flex",
		justifyContent: "space-between"
	}),

	"@media (max-width: 550px)": {
		startButtons: (props: { state: number }) => ({
			height: (props.state === 0) ? "6rem" : 0,
			width: "19rem",
		}),
		h2: {
			fontSize: "1.6rem",
		},
		buttons: (props: { state: number }) => ({
			height: (props.state === 0) ? "4em" : 0,
		})
	},

	"@media (max-width: 400px)": {
		startButtons: () => ({
			width: "17rem",
		})
	}
});

export default useStyles;
