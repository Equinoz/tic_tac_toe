import { useRef, useEffect, MouseEvent } from "react";
import PropTypes from "prop-types";

import useStyles from "./css";

const Game = (props: { state: number, playMove: (x: number, y: number) => void }) => {
	const classes = useStyles(props);

	const canvas = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvas.current) {
			const context = canvas.current.getContext("2d");

			if (context) {
				const height = canvas.current.height,
					width = canvas.current.width;

				context.fillStyle = "#05171c";
				context.fillRect((width / 3), 0, 2, height);
				context.fillRect((width / 1.5), 0, 2, height);
				context.fillRect(0, (height / 3), width, 1);
				context.fillRect(0, (height / 1.5), width, 1);
			}
		}
	});

	const onClick = (e: MouseEvent) => {
		const canvas = document.getElementsByTagName("canvas")[0];
		const rect = canvas.getBoundingClientRect();

		const targetX = e.pageX - rect.left;
		const targetY = e.pageY - Math.floor(rect.top) - window.scrollY;
		const x = Math.floor((targetX / rect.width) * 3);
		const y = Math.floor((targetY / rect.height) * 3);

		props.playMove(x, y);
	};

	return (
		<canvas ref={canvas} onClick={(e) => onClick(e)} className={classes.game}></canvas>
	);
};

Game.propTypes = {
	state: PropTypes.number.isRequired,
	playMove: PropTypes.func.isRequired
};

export default Game;
