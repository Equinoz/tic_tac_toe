import useStyles from "./css.js";

const Message = () => {
	const classes = useStyles();

	return (
		<p className={ classes.message }>Fake message</p>
	);
};

export default Message;
