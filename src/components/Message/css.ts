import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	message: (props: { state: number }) => ({
		height: (props.state !== 0) ? "3.5rem" : 0,
		margin: (props.state !== 0) ? "1rem 1rem 1rem 1rem" : 0,
		fontSize: "3rem",
		fontWeigth: "bold",
		color: "#06708E",
		textAlign: "center",
		boxSizing: "border-box",
		overflow: "hidden",
		transition: "height 0.5s ease-out",
	}),

	"@media (max-width: 700px)": {
		message: (props: { state: number }) => ({
			height: (props.state !== 0) ? "2.2rem" : 0,
			fontSize: "2rem"
		})
	},

	"@media (max-width: 500px)": {
		message: (props: { state: number }) => ({
			height: (props.state !== 0) ? "3.1rem" : 0,
			fontSize: "1.5rem"
		})
	}
});

export default useStyles;
