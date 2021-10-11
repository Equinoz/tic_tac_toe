import useStyles from "./css.js";

const Game = (props: { onClick: any}) => {
	const classes = useStyles();

	return (
		<div onClick={ props.onClick } className={ classes.game }>
		</div>
	);
};

export default Game;
