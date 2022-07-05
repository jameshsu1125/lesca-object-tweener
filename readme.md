[![React](https://img.shields.io/badge/-ReactJs-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://zh-hant.reactjs.org/)
[![React](https://img.shields.io/badge/Less-1d365d?style=for-the-badge&logo=less&logoColor=white)](https://lesscss.org/)
[![React](https://img.shields.io/badge/Typescript-4277c0?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://www.w3schools.com/html/)
[![React](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3schools.com/css/)
[![NPM](https://img.shields.io/badge/NPM-ba443f?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![React](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![NPM](https://img.shields.io/badge/DEV-Jameshsu1125-9cf?style=for-the-badge)](https://www.npmjs.com/~jameshsu1125)

# Why use it?

tween object value.

#### [Live Demo](https://jameshsu1125.github.io/lesca-object-tweener/)

# Installation

```sh
npm install lesca-object-tweener --save
```

## Usage

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

tweener
  .add({
    to: { top: 1000 },
    duration: 1000,
    delay: 1000,
    easing: Bezier.easeInOutQuint,
    onStart: () => alert('start'),
    onUpdate: (e) => console.log(e), // {top:0~1000, left:500}
    onComplete: (e) => console.log(e), // {top:1000, left:500}
  })
  .play();
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

## Development

### Methods

| Methods                                | options |    description    | default |
| :------------------------------------- | :-----: | :---------------: | ------: |
| **new Tweener**( **params**:_object_ ) | params  | new Tweener class |         |
| .**add**(**params**:_object_)          | params  |   tween object    |         |
| .**stop**()                            |         |    stop tween     |         |

### Properties

| Properties            |   type   |      description      |      default |
| :-------------------- | :------: | :-------------------: | -----------: |
| params.**from**       |  object  | object value = number |              |
| params.**to**         |  object  | object value = number |              |
| params.**duration**   |  number  |    tween duration     |         1000 |
| params.**delay**      |  number  |      tween delay      |            0 |
| params.**easing**     |  array   | cubic-bezier 4 values | easeOutQuart |
| params.**onUpdate**   | function |     call by frame     |         void |
| params.**onComplete** | function |     call when end     |         void |
| params.**onStart**    | function |    call when start    |         void |

### Features

- TypeScript
- maintain if necessary

# references

[css-cubic-bezier-generator](https://www.cssportal.com/css-cubic-bezier-generator/)

[bezier-easing](https://www.npmjs.com/package/bezier-easing)
