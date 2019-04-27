import blessed from 'neo-blessed';
import {
  Component,
  render,
  createRef,
  useReducer,
  createElement // eslint-disable-line no-unused-vars
} from 'rax';
import BlessedDriver from './driver';

class App extends Component {
  constructor(props) {
    super(props);
    this._list = createRef();
  }

  componentDidMount() {
    this._list.current.focus();
  }

  render() {
    return (
      <box>
        <box position={{ height: '50%' }}>
          <text position={{ top: 0, height: 2}}>Hello</text>
          <list
            clickable
            focusable
            mouse
            keys
            keyable
            vi
            ref={this._list}
            position={{ top: 2 }}
            border='line'
            items={['a', 'b', 'c']} />
        </box>
        <box position={{ top: '50%' }}>
          <CounterContainer />
        </box>
      </box>
    )
  }
}

const INCREMENT_COUNT = 'INCREMENT_COUNT';
const DECREMENT_COUNT = 'DECREMENT_COUNT';

function counterReducer(state, action) {
  switch (action.type) {
  case INCREMENT_COUNT:
    return state + 1;
  case DECREMENT_COUNT:
    return Math.max(state - 1, 0);
  default:
    return state;
  }
}

function CounterContainer() {
  const [state, dispatch] = useReducer(counterReducer, 0);
  const increment = () => dispatch({type: INCREMENT_COUNT});
  const decrement = () => dispatch({type: DECREMENT_COUNT});

  return (
    <Counter 
      count={state}
      increment={increment}
      decrement={decrement}
    />
  );
}

const Counter = ({ count, increment, decrement }) => (
  <box>
    <text height={2}>{count}</text>
    <button mouse clickable top={2} onClick={increment}>+</button>
    <button mouse clickable top={4} onClick={decrement}>-</button>
    {
      Array(count).fill(0).map((x, index) => <text top={5 + index}>!</text>)  
    }
  </box>
);

const driver = new BlessedDriver(blessed)
const screen = blessed.screen({
  autopadding: true,
  smartCSR: true,
  title: 'sample',
  fullUnicode: true,
  debug: true
});
screen.key(['C-c'], () => process.exit(0));
render(<App />, screen, { driver });
