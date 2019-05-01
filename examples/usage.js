import blessed from 'blessed';
import { render, createElement } from 'rax';
import createDriver from '../src';

const App = () => (
  <box>Hello</box>
);
const driver = createDriver()
const screen = blessed.screen({
  autopadding: true,
  smartCSR: true,
  title: 'sample',
  fullUnicode: true,
  debug: true
});

screen.key(['C-c'], () => process.exit(0));

render(<App />, screen, { driver });

