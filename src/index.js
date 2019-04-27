import assert from 'assert';
import blessed from 'neo-blessed';
import {Component, render, createElement} from 'rax';
import {
  replaceChild,
  removeChild,
  setAttribute,
  propsToNodeOptions
} from './shared/utils';

class BlessedDriver {
  constructor(blessed, screenOptions = {}) {
    assert(blessed);
    assert(typeof screenOptions === 'object');

    this._blessed = blessed;
    this._screenOptions = screenOptions;
  }

  createBody() {
    assert(arguments.length === 0);

    return this._blessed.screen(this._screenOptions);
  }

  createEmpty(component) {
    throw new Error('Not implemented');
  }

  createText(text, component) {
    return this._blessed.text({ content: text });
  }

  updateText(node, text) {
    node.setContent(text);
  }

  createElement(type, props, component) {
    assert(this._blessed[type]);
    assert(props.children);

    const options = propsToNodeOptions(props);
    const element = this._blessed[type](options);
    return element;
  }

  appendChild(node, parent) {
    parent.append(node);
  }

  removeChild(node, parent) {
    removeChild(node, parent);
  }

  replaceChild(newChild, oldChild, parent) {
    replaceChild(newChild, oldChild, parent);
  }

  insertAfter(node, after, parent) {
    assert(parent != null);

    parent.insertAfter(node, after);

    assert(parent.children.findIndex(node) > -1);
    assert(parent.children.findIndex(node) > parent.children.findIndex(after));
  }

  insertBefore(node, before, parent) {
    assert(parent != null);

    parent.insertBefore(node, before);

    assert(parent.children.findIndex(node) > -1);
    assert(parent.children.findIndex(node) < parent.children.findIndex(before));
  }

  addEventListener(node, eventName, eventHandler) {
    return node.on(eventName, eventHandler);
  }

  removeEventListener(node, eventName, eventHandler) {
    return node.removeListener(eventName, eventHandler);
  }

  setAttribute(node, propKey, propValue) {
    setAttribute(node, propKey, propValue);
  }

  removeAttribute(node, propKey) {
    throw new Error('Not implemented');
  }

  setStyle(node, styleObject) {
    throw new Error('Not implemented');
  }

  beforeRender({element, hybrate, container}) {
  }

  afterRender({element, hybrate, container}) {
    assert(container instanceof blessed.Screen);
    container.render();
  }
}

class App extends Component {
  render() {
    return <box>Hello</box>
  }
}

const driver = new BlessedDriver(blessed)
const screen = blessed.screen({
  autopadding: true,
  smartCSR: true,
  title: 'redis-term',
  fullUnicode: true
});
render(<App />, screen, { driver });
