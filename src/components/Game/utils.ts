import { MouseEvent } from "react";

const drawCircle = (context: { current: any }, xCell: number, yCell: number) => {
	if (context.current) {
		const x = 200 * xCell + 100,
			y = 200 * yCell + 100;

		let i = -(Math.PI / 2);

		const drawing = setInterval(() => {
			context.current.beginPath();
			context.current.arc(x, y, 65, i, i + 0.033);
			context.current.stroke();

			i += 0.033;
			if (i > Math.PI * 1.5) {
				clearInterval(drawing);
			}
		}, 5);
	}
};

const drawCross = (context: { current: any }, xCell: number, yCell: number) => {
	if (context.current) {
		const x = 200 * xCell + 40,
			y = 200 * yCell + 40;

		let i = 0;

		const drawing = setInterval(() => {
			context.current.beginPath();
			if (i < 121) {
				context.current.moveTo(x + i, y + i);
				context.current.lineTo(x + i + 1, y + i + 1);
			}
			else {
				context.current.moveTo(x + 240 - i, y - 120 + i);
				context.current.lineTo(x + 239 - i, y - 119 + i);
			}
			context.current.stroke();

			i++;
			if (i > 240) {
				clearInterval(drawing);
			}
		}, 4);
	}
};

const drawBoard = (canvas: { current: any }, context : { current: any }) => {
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
};

const determineWinner = (board: Array<Array<number>>, context: { current: any }) => {
	if (context.current) {
		const cases: Array<number> = [];
		board.forEach(line => line.forEach(x => cases.push(x)));

		let start: Array<number>,
			end: Array<number>;

		if (cases[0] === cases[1] && cases[1] === cases[2] && cases[0] !== 0) {
			start = [25, 100]; end = [575, 100];
		}
		else if (cases[3] === cases[4] && cases[4] === cases[5] && cases[3] !== 0) {
			start = [25, 300]; end = [575, 300];
		}
		else if (cases[6] === cases[7] && cases[7] === cases[8] && cases[6] !== 0) {
			start = [25, 500]; end = [575, 500];
		}
		else if (cases[0] === cases[3] && cases[3] === cases[6] && cases[0] !== 0) {
			start = [100, 25]; end = [100, 575];
		}
		else if (cases[1] === cases[4] && cases[4] === cases[7] && cases[1] !== 0) {
			start = [300, 25]; end = [300, 575];
		}
		else if (cases[2] === cases[5] && cases[5] === cases[8] && cases[2] !== 0) {
			start = [500, 25]; end = [500, 575];
		}
		else if (cases[0] === cases[4] && cases[4] === cases[8] && cases[0] !== 0) {
			start = [35, 35]; end = [565, 565];
		}
		else {
			start = [35, 565]; end = [565, 35];
		}

		context.current.strokeStyle = "#072e39";
		context.current.lineWidth = 14;

		const deltaX = end[0] - start[0],
			deltaY = end[1] - start[1];
		const stepX = deltaX / 300,
			stepY = deltaY / 300;
		let x = 0,
			y = 0;

		const drawing = setInterval(() => {
			context.current.beginPath();
			context.current.moveTo(start[0] + x, start[1] + y);
			context.current.lineTo(start[0] + x + 1, start[1] + y + 1);
			context.current.stroke();

			x += stepX;
			y += stepY;
			if (x > deltaX || Math.abs(y) > Math.abs(deltaY)) {
				clearInterval(drawing);
			}
		}, 1);
	}
};

const getClickPosition = (e: MouseEvent, canvas: { current: any }): Array<number> | false => {
	if (canvas.current) {
		const rect = canvas.current.getBoundingClientRect();

		const targetX = e.clientX - rect.left;
		const targetY = e.clientY - Math.floor(rect.top);
		const x = Math.floor((targetX / rect.width) * 3);
		const y = Math.floor((targetY / rect.height) * 3);
		
		return [x, y];
	}
	else {
		return false;
	}
};

export {
	drawCircle,
	drawCross,
	drawBoard,
	determineWinner,
	getClickPosition
};
