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

	// Handle the winner displaying when the game is over
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

			// If the match is not draw, display a winning line
			if (match.isWinner !== 0) {
				determineWinner(match.getBoard(), context);
			}
		}, [state, setState, match]
	);

	// Handle the player's click
	const onClick = (e: MouseEvent) => {
		if (moveAllowed && !match.isOver && !match.getComputerMove()) {
			// New click forbidden
			setState({
				...state,
				moveAllowed: false
			});
			
			const clickPosition = getClickPosition(e, canvas);

			if (clickPosition) {
				const [x, y] = clickPosition;

				// Move allowed
				if (match.playerMove(x, y)) {
					if (playerFirst) {
						drawCross(context, x, y);
					}
					else {
						drawCircle(context, x, y);
					}

					// Game paused during animation time
					setTimeout(() => {
						if (match.isWinner === 2 || (playerFirst && match.isWinner === 0)) {
							handleEndgame();
						}
						else {
							// Computer's turn
							setState({
								...state,
								message: "computer's move...",
								moveAllowed: false
							});
						}
					}, 1200);
				}
				else {
					// If move isn't correct, allow a new click
					setState({
						...state,
						moveAllowed: true
					});
				}
			}
		}
	};

	// Draw an empty board for each new match
	useEffect(() => {
		if (canvas.current) {
			context.current = canvas.current.getContext("2d");
		}

		drawBoard(canvas, context);
	}, [match]);

	// Check if the computer have to play in case of changing state
	useEffect(() => {
		if (match) {
			const computerMove = match.getComputerMove();

			if (computerMove) {
				// Simulate a reflexion time
				setTimeout(() => {
					const [x, y] = computerMove;

					if (playerFirst) {
						drawCircle(context, x, y);
					}
					else {
						drawCross(context, x, y);
					}

					// Game paused during animation time
					setTimeout(() => {
						if (match.isOver) {
							handleEndgame();
						}
						else {
							// Player's turn
							setState({
								...state,
								message: "play your move",
								moveAllowed: true
							});
						}
					}, 1200);
				}, 2000 + Math.floor(Math.random() * 2000));
			}
		}
	}, [state, setState, message, playerFirst, match, handleEndgame]);

	return (
		<canvas ref={ canvas } height="600" width="600" onClick={ (e) => onClick(e) } className={ classes.game }></canvas>
	);
};

export default Game;
