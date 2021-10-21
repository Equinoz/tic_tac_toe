import useStyles from "./css.js";

const Header = () => {
	const classes = useStyles();

	return (
		<header className={ classes.header }>
			<h1 className={ classes.h1 }>Tic tac toe</h1>
			<p className={ classes.p }>Made with React, Typescript and React-JSS! Source code at <a href="https://github.com/Equinoz/tic_tac_toe">https://github.com/Equinoz/tic_tac_toe</a></p>
		</header>
	);
};

export default Header;
