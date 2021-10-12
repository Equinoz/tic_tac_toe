import { useRef, useEffect, MouseEvent } from "react";
import PropTypes from "prop-types";

import useStyles from "./css";

const Game = (props: { state: number, playMove: (x: number, y: number) => void }) => {
	const classes = useStyles(props);

	const canvas = useRef<HTMLCanvasElement>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);

	useEffect(() => {
		if (canvas.current) {
			context.current = canvas.current.getContext("2d");

			if (context.current) {
				context.current.fillStyle = "#05171c";

				context.current.fillRect(200, 0, 3, 600);
				context.current.fillRect(400, 0, 3, 600);
				context.current.fillRect(0, 200, 600, 3);
				context.current.fillRect(0, 400, 600, 3);

				context.current.lineWidth = 10;
				context.current.lineCap = "round";
				context.current.strokeStyle = "#084252";
			}
		}
	});

	const drawCross = (xCell: number, yCell: number) => {
		if (context.current) {
			const x = 200 * xCell + 100,
				y = 200 * yCell + 100;

			context.current.beginPath();
			context.current.moveTo(x - 60, y - 60);
			context.current.lineTo(x + 60, y + 60);
			context.current.moveTo(x - 60, y + 60);
			context.current.lineTo(x + 60, y - 60);
			context.current.stroke();
		}
	};

	const drawCircle = (xCell: number, yCell: number) => {
		if (context.current) {
			const x = 200 * xCell + 100,
				y = 200 * yCell + 100;

			context.current.beginPath();
			context.current.arc(x, y, 65, 0, 360);
			context.current.stroke();
		}
	};

	const onClick = (e: MouseEvent) => {
		if (canvas.current) {
			const rect = canvas.current.getBoundingClientRect();

			const targetX = e.clientX - rect.left;
			const targetY = e.clientY - Math.floor(rect.top);
			const x = Math.floor((targetX / rect.width) * 3);
			const y = Math.floor((targetY / rect.height) * 3);

			props.playMove(x, y);
			drawCross(0, 1);
			drawCircle(1, 1);
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
