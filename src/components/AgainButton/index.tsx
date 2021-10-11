import PropTypes from "prop-types";

import Button from "../Button";

import useStyles from "./css";

const AgainButton = (props: { state: number, onClick: () => void }) => {
	const classes = useStyles(props);

	return (
		<div className={ classes.againButton }>
			<Button onClick={ props.onClick }>play again?</Button>
		</div>
	);
};

AgainButton.propTypes = {
	state: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired
};

export default AgainButton;
