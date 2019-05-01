# rax-blessed-driver (WIP)

> blessed driver for Rax.

Note: This package is in early stage.

## Usage

```javascript
import blessed from 'blessed';
import { render, createElement } from 'rax';
import { createDriver } from 'rax-blessed-driver';

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

render(<App />, screen, { driver });
```

## Known issues
* Effect (hover, focus) do not work once mounted.

## TODO

- [ ] `blessed-contrib` support
