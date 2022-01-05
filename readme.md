[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/)

# Installation

```sh
$ npm install lesca-object-tweener --save
```

# Usage

```javascript
import Tweener, { Bezier } from 'lesca-object-tweener';

// use single tween
const tweener = new Tweener({
	from: { top: 0, left: 0 },
	to: { top: 500, left: 500 },
	duration: 1000,
	delay: 1000,
	easing: Bezier.linear,
	onUpdate: (e) => console.log(e), // {top:0~500, left:0~500}
	onComplete: (e) => console.log(e), // { top: 500, left: 500 }
}).play();

tweener.add({
	to: { top: 1000 },
	duration: 1000,
	delay: 1000,
	easing: Bezier.easeInOutQuint,
	onStart: () => alert('start'),
	onUpdate: (e) => console.log(e), // {top:0~1000, left:500}
	onComplete: (e) => console.log(e), // {top:1000, left:500}
});
```

```javascript
// use multiple tween
const tweener = new Tweener();

[
	{ top: 0, left: 0 },
	{ top: 100, left: 100 },
].forEach((data) => {
	tweener.add({
		from: { top: 0 }, // first loop will add "from". Second time tweener will ignore "from"
		to: { top: 100 },
		duration: 0,
		easing: Bezier.easeInOutQuint,
		onUpdate: (e) => console.log(e), // { top:0~100 }
		onComplete: (e) => console.log(e), // { top:100 }
	});
});
tweener.play(); // Need to run play when new constructor without any params
```

# Properties

| Properties              | options  |      description      |      default |
| :---------------------- | :------: | :-------------------: | -----------: |
| new Tweener({ params }) |  params  |   new Tweener class   |              |
| params.from             |  object  | object value = number |              |
| params.to               |  object  | object value = number |              |
| params.duration         |  number  |    tween duration     |         1000 |
| params.delay            |  number  |      tween delay      |            0 |
| params.easing           |  array   | cubic-bezier 4 values | easeOutQuart |
| params.onUpdate         | function |     call by frame     |         void |
| params.onComplete       | function |     call when end     |         void |
| params.onStart          | function |    call when start    |         void |

# Methods

| Methods     | options | description |     default |
| :---------- | :-----: | :---------: | ----------: |
| add(params) | params  | same as new | same as new |
| stop        |         |    stop     |             |

# references

[css-cubic-bezier-generator](https://www.cssportal.com/css-cubic-bezier-generator/)

[bezier-easing](https://www.npmjs.com/package/bezier-easing)
