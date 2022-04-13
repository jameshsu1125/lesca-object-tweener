import { Button, ButtonGroup } from '@mui/material';
import { useEffect } from 'react';
import Code from '../components/code';
import { name } from '../config';

const codes = [
  {
    title: '1. Installation',
    code: `npm install ${name} --save`,
    type: 'text',
  },
  {
    title: '2. Usage',
    code: `import Tweener, { Bezier } from 'lesca-object-tweener';

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

// tween again
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
  .play();`,
    type: 'js',
  },
];

const Usage = () => {
  useEffect(() => {}, []);
  return (
    <div className='Usage'>
      <h2>Usage</h2>
      {codes.map((e) => (
        <div key={e.title}>
          <h3>{e.title}</h3>
          <Code code={e.code} theme={e.type} />
        </div>
      ))}
      <ButtonGroup variant='contained'>
        <Button>click</Button>
      </ButtonGroup>
    </div>
  );
};
export default Usage;
