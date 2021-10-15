import { createUseStyles } from "react-jss";

import { Status } from "../../enums";

const useStyles = createUseStyles({
	message: (status: number) => ({
		height: (status !== Status.Init) ? "3.5rem" : 0,
		margin: (status !== Status.Init) ? "1rem 1rem 1rem 1rem" : 0,
		fontSize: "3rem",
		fontWeigth: "bold",
		color: "#06708E",
		textAlign: "center",
		boxSizing: "border-box",
		overflow: "hidden",
		transition: "height 0.5s ease-out",
	}),

	"@media (max-width: 700px)": {
		message: (status: number) => ({
			height: (status !== Status.Init) ? "2.2rem" : 0,
			fontSize: "2rem"
		})
	},

	"@media (max-width: 500px)": {
		message: (status: number) => ({
			height: (status !== Status.Init) ? "3.1rem" : 0,
			fontSize: "1.5rem"
		})
	}
});

export default useStyles;
