import React from 'react';
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

const tween = new Tweener({
	from: { top: 100, left: 0, width: 100 },
});

tween
	.add({
		to: { left: 250 },
		easing: Bezier.easeInOutQuint,
		duration: 1000,
		delay: 1000,
		onStart: () => {
			console.log('start2');
		},
		onUpdate: (e) => onUpdate(e),
		onComplete: (e) => onUpdate(e),
	})
	.play();

const stop = () => {
	tween.stop();
};

setTimeout(() => {
	tween
		.stop()
		.clearQueue()
		.add({
			to: { width: 200 },
			easing: Bezier.easeInOutQuint,
			duration: 1000,
			delay: 1000,
			onStart: () => {
				console.log('start3');
			},
			onUpdate: (e) => onUpdate(e),
			onComplete: (e) => onUpdate(e),
		})
		.play();
}, 5500);

function Demo() {
	return (
		<div id='container'>
			<div id='text'></div>
			<div id='ball'></div>
			<button onClick={stop}>stop</button>
		</div>
	);
}

render(<Demo />, document.getElementById('app'));
