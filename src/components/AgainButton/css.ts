import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	againButton: (props: { state: number }) => ({
		height: (props.state === 2) ? "5rem" : 0,
		width: "12rem",
		display: "flex",
		justifyContent: "center",
		boxSizing: "border-box",
		overflow: "hidden",
		transition: "height 0.5s ease-out",
	})
});

export default useStyles;
