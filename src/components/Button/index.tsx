import PropTypes from "prop-types";

import useStyles from "./css.js";

const Button = (props: { children: string, onClick: () => void }) => {
	const classes = useStyles();

	return (
		<div onClick={ props.onClick } className={ classes.button }>
			{ props.children[0].toUpperCase() + props.children.slice(1) }
		</div>
	);
};

Button.propTypes = {
	children: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default Button;
