import { useGlobalContext } from "../../context";

import useStyles from "./css";

const Message = () => {
	const { state: { status, message } } = useGlobalContext();

	const classes = useStyles(status);

	return (
		<p className={ classes.message }>{ message && message[0].toUpperCase() + message.slice(1) }</p>
	);
};

export default Message;
