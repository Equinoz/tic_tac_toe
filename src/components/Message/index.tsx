import PropTypes from "prop-types";

import useStyles from "./css.js";

const Message = (props: { message: string }) => {
	const classes = useStyles();

	return (
		<p className={ classes.message }>{ props.message }</p>
	);
};

Message.propTypes = {
	message: PropTypes.string.isRequired
};

export default Message;
