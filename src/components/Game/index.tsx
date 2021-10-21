import { useRef, useEffect, useCallback, MouseEvent } from "react";

import { useGlobalContext } from "../../context";
import { Status } from "../../enums";
import { drawCircle, drawCross, drawBoard, determineWinner, getClickPosition } from "./utils";

import useStyles from "./css";

const Game = () => {
	const { state, setState } = useGlobalContext();
	const { message, playerFirst, match, moveAllowed } = state;

	const classes = useStyles(moveAllowed);

	const canvas = useRef<HTMLCanvasElement>(null),
		context = useRef<CanvasRenderingContext2D | null>(null);

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
				determineWinner(match.getBoard(), context);
			}
		}, [state, setState, match]
	);

	const onClick = (e: MouseEvent) => {
		if (moveAllowed && !match.isOver && !match.getComputerMove()) {
			setState({
				...state,
				moveAllowed: false
			});
			const res = getClickPosition(e, canvas);
			if (res) {
				const [x, y] = res;

				if (match.playerMove(x, y)) {
					if (playerFirst) {
						drawCross(context, x, y);
					}
					else {
						drawCircle(context, x, y);
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

	useEffect(() => {
		if (canvas.current) {
			context.current = canvas.current.getContext("2d");
		}

		drawBoard(canvas, context);
	}, [match]);

	useEffect(() => {
		if (match) {
			const computerMove = match.getComputerMove();
			if (computerMove) {
				const delay = 2000 + Math.floor(Math.random() * 2000);
				setTimeout(() => {
					const [x, y] = computerMove;
					if (playerFirst) {
						drawCircle(context, x, y);
					}
					else {
						drawCross(context, x, y);
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

	return (
		<canvas ref={ canvas } height="600" width="600" onClick={ (e) => onClick(e) } className={ classes.game }></canvas>
	);
};

export default Game;
