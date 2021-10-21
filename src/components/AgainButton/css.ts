import { createUseStyles } from "react-jss";

import { Status } from "../../enums";

const useStyles = createUseStyles({
	againButton: (status: number) => ({
		height: (status === Status.Over) ? "5rem" : 0,
		width: "12rem",
		display: "flex",
		justifyContent: "center",
		boxSizing: "border-box",
		overflow: "hidden",
		transition: "height 0.5s ease-out",
	})
});

export default useStyles;
