import { useRef, useEffect, useCallback, MouseEvent } from "react";

import { useGlobalContext } from "../../context";
import { Status } from "../../enums";

import useStyles from "./css";

const Game = () => {
	const { state, setState } = useGlobalContext();
	const { message, playerFirst, match, moveAllowed } = state;

	const classes = useStyles(moveAllowed);

	const canvas = useRef<HTMLCanvasElement>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);

	// TODO refacto
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

	const handleEndgame = useCallback(
		() => {
			let message: string;

			switch (match.isWinner) {
			case 0:
				message = "draw!";
				break;
			case 1:
				message = "sorry the computer beat you...";
				break;
			default:
				message = "congratulations you win!";
			}

			setState({
				...state,
				status: Status.Over,
				message,
				moveAllowed: false
			});

			if (match.isWinner !== 0) {
				const board = match.getBoard();
				let start: Array<number>,
					end: Array<number>;

				if (board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
					start = [25, 100];
					end = [575, 100];
				}
				else if  (board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
					start = [25, 300];
					end = [575, 300];
				}
				else if  (board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
					start = [25, 500];
					end = [575, 500];
				}
				else if  (board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
					start = [100, 25];
					end = [100, 575];
				}
				else if  (board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
					start = [300, 25];
					end = [300, 575];
				}
				else if  (board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
					start = [500, 25];
					end = [500, 575];
				}
				else if  (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
					start = [25, 25];
					end = [575, 575];
				}
				else {
					start = [25, 575];
					end = [575, 25];
				}
				if (context.current) {
					context.current.strokeStyle = "#072e39";
					context.current.lineWidth = 14;

					const deltaX = end[0] - start[0];
					const deltaY = end[1] - start[1];
					const stepX = deltaX / 300;
					const stepY = deltaY / 300;
					let ix = 0,
						iy = 0;

					const drawing = setInterval(() => {
						if (context.current) {
							context.current.beginPath();
							context.current.moveTo(start[0] + ix, start[1] + iy);
							context.current.lineTo(start[0] + ix + 1, start[1] + iy + 1);
							context.current.stroke();
						}

						ix += stepX;
						iy += stepY;
						if (Math.abs(ix) > Math.abs(deltaX) || Math.abs(iy) > Math.abs(deltaY)) {
							clearInterval(drawing);
						}
					}, 1);
				}
			}
		}, [state, setState, match]
	);

	useEffect(() => {
		if (match) {
			const computerMove = match.getComputerMove();
			if (computerMove) {
				const delay = 2000 + Math.floor(Math.random() * 2000);
				setTimeout(() => {
					const [x, y] = computerMove;
					if (playerFirst) {
						drawCircle(x, y);
					}
					else {
						drawCross(x, y);
					}
					setTimeout(() => {
						if (match.isWinner === 1 || match.isWinner === 0) {
							handleEndgame();
						}
						else {
							setState({
								...state,
								message: "play your move",
								moveAllowed: true
							});
						}
					}, 1200);
				}, delay);
			}
		}
	}, [state, setState, message, playerFirst, match, handleEndgame]);

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
		if (moveAllowed && !match.isOver && !match.getComputerMove()) {
			setState({
				...state,
				moveAllowed: false
			});
			if (canvas.current) {
				const rect = canvas.current.getBoundingClientRect();

				const targetX = e.clientX - rect.left;
				const targetY = e.clientY - Math.floor(rect.top);
				const x = Math.floor((targetX / rect.width) * 3);
				const y = Math.floor((targetY / rect.height) * 3);

				if (match.playerMove(x, y)) {
					if (playerFirst) {
						drawCross(x, y);
					}
					else {
						drawCircle(x, y);
					}
					setTimeout(() => {
						if (match.isWinner === 2 || (match.isWinner === 0 && playerFirst)) {
							handleEndgame();
						}
						else {
							setState({
								...state,
								message: "computer's move...",
								moveAllowed: false
							});
						}
					}, 1200);
				}
				else {
					setState({
						...state,
						moveAllowed: true
					});
				}
			}
		}
	};

	return (
		<canvas ref={ canvas } height="600" width="600" onClick={ (e) => onClick(e) } className={ classes.game }></canvas>
	);
};

export default Game;
