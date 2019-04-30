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
import BlessedDriver from '../src/driver';

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
    const driver = new BlessedDriver(blessed);

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

