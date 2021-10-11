import PropTypes from "prop-types";

import useStyles from "./css";

const Message = (props: { children: string, state: number }) => {
	const classes = useStyles(props);

	return (
		<p className={ classes.message } >{ props.children }</p>
	);
};

Message.propTypes = {
	children: PropTypes.string.isRequired,
	state: PropTypes.number.isRequired
};

export default Message;
