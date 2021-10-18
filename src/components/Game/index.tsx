import { useRef, useEffect, MouseEvent } from "react";

import { useGlobalContext } from "../../context";
import { Status } from "../../enums";

import useStyles from "./css";

const Game = () => {
	const { state, setState } = useGlobalContext();
	const { status, message, playerFirst, match } = state;

	const classes = useStyles(status);

	const canvas = useRef<HTMLCanvasElement>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);

	// TODO empêcher les clics intempestifs, gérer les parties nulles, ajouter le trait de fin, voir les temps de dessin qui se chevauchent, pas deux fois la même case, clic qui bloque le jeu de l'ordinateur
	useEffect(() => {
		if (canvas.current) {
			context.current = canvas.current.getContext("2d");

			if (context.current) {
				context.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
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
	}, [match]);

	useEffect(() => {
		setTimeout(() => {
			if (match) {
				const computerMove = match.getComputerMove();
				if (computerMove) {
					const [x, y] = computerMove;
					if (playerFirst) {
						drawCircle(x, y);
					}
					else {
						drawCross(x, y);
					}
					setTimeout(() => {
						if (match.isOver) {
							setState({
								...state,
								status: Status.Over,
								message: "sorry the computer beat you..."
							});
						}
						else {
							setState({
								...state,
								message: "play your move"
							});
						}
					}, 1200);
				}
			}
		}, 1000 + Math.floor(Math.random() * 3000));
	}, [state, setState, message, playerFirst, match]);

	const drawCross = (xCell: number, yCell: number) => {
		const x = 200 * xCell + 40,
			y = 200 * yCell + 40;

		let i = 0;
		const drawing = setInterval(() => {
			if (context.current) {
				if (i < 121) {
					context.current.beginPath();
					context.current.moveTo(x + i, y + i);
					context.current.lineTo(x + i + 1, y + i + 1);
					context.current.stroke();
				}
				else {
					context.current.beginPath();
					context.current.moveTo(x + 240 - i, y - 120 + i);
					context.current.lineTo(x + 239 - i, y - 119 + i);
					context.current.stroke();
				}
			}

			i++;
			if (i > 240) {
				clearInterval(drawing);
			}
		}, 4);
	};

	const drawCircle = (xCell: number, yCell: number) => {
		const x = 200 * xCell + 100,
			y = 200 * yCell + 100;

		let i = -(Math.PI / 2);
		const drawing = setInterval(() => {
			if (context.current) {
				context.current.beginPath();
				context.current.arc(x, y, 65, i, i + 0.033);
				context.current.stroke();
			}

			i += 0.033;
			if (i > Math.PI * 1.5) {
				clearInterval(drawing);
			}
		}, 5);
	};

	const onClick = (e: MouseEvent) => {
		if (!match.isOver && !match.getComputerMove()) {
			if (canvas.current) {
				const rect = canvas.current.getBoundingClientRect();

				const targetX = e.clientX - rect.left;
				const targetY = e.clientY - Math.floor(rect.top);
				const x = Math.floor((targetX / rect.width) * 3);
				const y = Math.floor((targetY / rect.height) * 3);

				match.playerMove(x, y);
				if (playerFirst) {
					drawCross(x, y);
				}
				else {
					drawCircle(x, y);
				}
				setTimeout(() => {
					if (match.isOver) {
						setState({
							...state,
							status: Status.Over,
							message: "congratulations you win!"
						});
					}
					else {
						setState({
							...state,
							message: "computer's move...",
							match: match
						});
					}
				}, 1200);
			}
		}
		else {
			console.log("Pas encore");
		}
	};
	// else {
	// 	console.log("FINI!!!!");
	// 	setState({
	// 		...state,
	// 		status: Status.Over,
	// 		message: "blablaaa"
	// 	});
	// }

	return (
		<canvas ref={ canvas } height="600" width="600" onClick={ (e) => onClick(e) } className={ classes.game }></canvas>
	);
};

export default Game;
