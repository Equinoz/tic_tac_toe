import PropTypes from "prop-types";

import useStyles from "./css.js";

const Button = (props: { text: string, onClick: () => void }) => {
	const classes = useStyles();

	return (
		<div onClick={ props.onClick } className={ classes.button }>
			{ props.text[0].toUpperCase() + props.text.slice(1) }
		</div>
	);
};

Button.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default Button;
