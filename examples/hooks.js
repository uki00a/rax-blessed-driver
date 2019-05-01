import { createElement, render, useReducer } from 'rax';
import blessed from 'blessed';
import createDriver from '../src';

const INCREMENT_COUNT = 'INCREMENT_COUNT';

function reducer(state, action) {
  switch (action.type) {
  case INCREMENT_COUNT:
    return state + action.payload;
  default:
    return state;
  }
}

const Counter = ({ count, increment, decrement }) => (
  <box>
    <text height={2}>{count}</text> 
    <box top={2}>
      <button
        onClick={increment}
        border='line'
        mouse
        clickable
        focusable
        position={{ height: 4, width: 4 }}>
        +
      </button>
      <button
        onClick={decrement}
        border='line'
        mouse
        clickable
        focusable
        position={{ left: 4, height: 4, width: 4 }}>
        -
      </button>
    </box>
  </box>
);

function CounterContainer() {
  const [count, dispatch] = useReducer(reducer, 0);
  const increment = () => dispatch({ type: INCREMENT_COUNT, payload: 1 });
  const decrement = () => dispatch({ type: INCREMENT_COUNT, payload: -1 });

  return (
    <Counter
      count={count} 
      increment={increment}
      decrement={decrement}
    />
  );
}

const screen = blessed.screen({
  autopadding: true,
  smartCSR: true,
  title: 'hooks-example',
  fullUnicode: true
});
const driver = createDriver(blessed);

screen.key(['C-c'], () => process.exit(0));

render(<CounterContainer />, screen, { driver });
