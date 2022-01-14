import React, { useEffect } from 'react';
import { render } from 'react-dom';
import Tweener, { Bezier } from './../lib/index';

import './styles.css';

const onUpdate = (data) => {
	const text = document.getElementById('text');
	const ball = document.getElementById('ball');

	if (text && ball) {
		text.innerText = JSON.stringify(data);
		Object.entries(data).forEach((e) => {
			const [key, value] = e;
			ball.style[key] = value + 'px';
		});
	}
};

const click = { index: 1 };

function Demo() {
	useEffect(() => {
		const tween = new Tweener({
			from: { top: 0, left: 0, width: 100 },
		});

		window.addEventListener('mousedown', () => {
			const { index } = click;
			const to = { left: index * 100 };
			tween
				.stop()
				.clearQueue()
				.add({
					to,
					duration: 1000,
					onUpdate: (e) => onUpdate(e),
					onComplete: (e) => onUpdate(e),
				})
				.play();
			click.index += 1;
		});
	}, []);
	return (
		<div id='container'>
			<div id='text'></div>
			<div id='ball'></div>
			<button onClick={stop}>stop</button>
		</div>
	);
}

render(<Demo />, document.getElementById('app'));
