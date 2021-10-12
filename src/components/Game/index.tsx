import { useRef, useEffect, MouseEvent } from "react";
import PropTypes from "prop-types";

import useStyles from "./css";

const Game = (props: { state: number, playMove: (x: number, y: number) => void }) => {
	const classes = useStyles(props);

	const canvas = useRef<HTMLCanvasElement>(null);
	let context: any;

	useEffect(() => {
		if (canvas.current) {
			context = canvas.current.getContext("2d");

			if (context) {
				context.fillStyle = "#05171c";
				context.fillRect(200, 0, 3, 600);
				context.fillRect(400, 0, 3, 600);
				context.fillRect(0, 200, 600, 3);
				context.fillRect(0, 400, 600, 3);

				context.lineWidth = 10;
				context.lineCap = "round";
				context.strokeStyle = "#084252";
			}
		}
	});

	const onClick = (e: MouseEvent) => {
		if (canvas.current) {
			const rect = canvas.current.getBoundingClientRect();

			const targetX = e.clientX - rect.left;
			const targetY = e.clientY - Math.floor(rect.top);
			const x = Math.floor((targetX / rect.width) * 3);
			const y = Math.floor((targetY / rect.height) * 3);

			props.playMove(x, y);
			drawCross(x, y);
			// drawCircle(x, y);
		}
	};

	const drawCross = (xCell: number, yCell: number) => {
		if (context) {
			const x = 200 * xCell + 100,
				y = 200 * yCell + 100;

			context.beginPath();
			context.moveTo(x - 60, y - 60);
			context.lineTo(x + 60, y + 60);
			context.moveTo(x - 60, y + 60);
			context.lineTo(x + 60, y - 60);
			context.stroke();
		}
	};

	const drawCircle = (xCell: number, yCell: number) => {
		if (context) {
			const x = 200 * xCell + 100,
				y = 200 * yCell + 100;

			context.beginPath();
			context.arc(x, y, 65, 0, 360);
			context.stroke();
		}
	};

	return (
		<canvas ref={ canvas } height="600" width="600" onClick={ (e) => onClick(e) } className={ classes.game }></canvas>
	);
};

Game.propTypes = {
	state: PropTypes.number.isRequired,
	playMove: PropTypes.func.isRequired
};

export default Game;
