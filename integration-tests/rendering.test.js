import assert from 'assert';
import {
  render,
  useEffect,
  useState,
  Component,
  createElement // eslint-disable-line no-unused-vars
} from 'rax';
import blessed from 'neo-blessed';
import streamBuffers from 'stream-buffers';
import createDriver from '../src';
import { RENDERING_RATE } from '../src/shared/constants';

function makeScreen() {
  const screen = blessed.screen({
    input: new streamBuffers.ReadableStreamBuffer({
      frequency: Infinity, 
      chunkSize: 0
    }),
    output: new streamBuffers.WritableStreamBuffer({
      initialSize: 0, 
      incrementAmount: 0
    })
  });

  return screen;
}

describe('basic rendering', () => {
  let screen;

  before(done => {
    screen = makeScreen();
    screen.on('render', done);

    const App = () => (
      <text>hello</text>
    );
    const driver = createDriver(blessed);

    render(<App />, screen, { driver });
  });

  after(() => {
    screen.destroy();
  });

  it('can render pure component', () => {
    assert(screen.children.length === 1);
    assert(screen.children[0].children.length === 1);
    assert(screen.children[0].children[0].content === 'hello');
  });
});

describe('batch rendering', () => {
  let screen;
  let renderCount = 0;

  before(done => {
    function App () {
      const [isVisible, setIsVisible] = useState(true);

      useEffect(() => {
        if (isVisible) {
          setTimeout(() => setIsVisible(false), RENDERING_RATE);
        } else {
          setTimeout(done, RENDERING_RATE);
        }
      }, [isVisible]);

      return (
        <box>
          <text content={isVisible ? 'visible' : 'invisible'}></text>
          {
            isVisible
              ? <text>hello</text>
              : null
          }
        </box>
      );
    }

    screen = makeScreen();

    screen.on('render', () => renderCount++);

    render(
      <App />,
      screen,
      { driver: createDriver(blessed) }
    );
  });

  after(() => {
    screen.destroy();
  });

  it('rendering should be batched', () => {
    assert(renderCount === 2); // mount + update
  });
});
