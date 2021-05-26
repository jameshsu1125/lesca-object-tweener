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
	from: { top: 0, left: 0 },
	to: { top: 500, left: 500 },
	easing: Bezier.linear,
	duration: 1000,
	delay: 1000,
	onStart: () => {
		console.log('start');
	},
	onUpdate: (e) => onUpdate(e),
	onCompelete: (e) => onUpdate(e),
});

tween.add({
	to: { left: 0, top: 0 },
	easing: Bezier.easeInOutQuint,
	duration: 1000,
	delay: 1000,
	onStart: () => {
		console.log('start2');
	},
	onUpdate: (e) => onUpdate(e),
	onCompelete: (e) => onUpdate(e),
});

const stop = () => {
	tween.stop();
};

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
