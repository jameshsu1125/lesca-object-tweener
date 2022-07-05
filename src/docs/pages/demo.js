import { Button, ButtonGroup, TextField, Box } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Tweener from '../../lib/';

const Demo = () => {
  const [state, setState] = useState({ x: 0, y: 0 });
  const [fromTo, setFromTo] = useState({ from: state, to: { x: 100, y: 100 } });

  const [index, setIndex] = useState(0);

  const tweener = useMemo(() => {
    return new Tweener(state);
  }, []);

  useEffect(() => {
    if (index === 0) return;
    tweener
      .add({
        ...fromTo,
        onStart: (e) => {
          console.log(e);
        },
        onUpdate: (e) => {
          setState(e);
        },
        onComplete: (e) => {
          setState(e);
          setFromTo((c) => ({ ...c, from: c.to }));
        },
      })
      .play();
  }, [index]);

  return (
    <div className='Demo'>
      <h2>Demo</h2>

      <h4>from</h4>
      <pre>
        <code>{JSON.stringify(fromTo.from)}</code>
      </pre>

      <h4>to</h4>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '10ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          required
          id='outlined-required'
          label='x'
          defaultValue={fromTo.to.x}
          type='number'
          onChange={(e) => {
            const { value } = e.target;
            setFromTo((c) => ({ ...c, to: { ...c.to, x: parseInt(value) } }));
          }}
        />
        <TextField
          required
          id='outlined-required'
          label='y'
          defaultValue={fromTo.to.y}
          type='number'
          onChange={(e) => {
            const { value } = e.target;
            setFromTo((c) => ({ ...c, to: { ...c.to, y: parseInt(value) } }));
          }}
        />
      </Box>

      <h4>object value</h4>
      <pre>
        <code>{JSON.stringify(state)}</code>
      </pre>
      <ButtonGroup variant='contained'>
        <Button
          onClick={() => {
            setIndex((c) => c + 1);
          }}
        >
          tween
        </Button>
      </ButtonGroup>
    </div>
  );
};
export default Demo;
