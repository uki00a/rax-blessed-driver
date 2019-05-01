import blessed from 'neo-blessed';
import { render, createElement } from 'rax';
import createDriver from '../src';

const App = () => (
  <box>Hello</box>
);
const driver = createDriver(blessed);
const screen = blessed.screen({
  autopadding: true,
  smartCSR: true,
  title: 'neo-blessed-example',
  fullUnicode: true,
  debug: true
});

screen.key(['C-c'], () => process.exit(0));

render(<App />, screen, { driver });
