import assert from 'assert';
import debounce from 'lodash.debounce';
import {
  replaceChild,
  removeChild,
  setAttribute,
  removeAttribute,
  propsToNodeOptions
} from './shared/node';

const EVENT_PREFIX_REGEXP = /^on[A-Z]/;

export default class BlessedDriver {
  constructor(blessed = require('blessed'), screenOptions = {}) {
    this._blessed = blessed;
    this._screenOptions = screenOptions;

    assert(this._blessed);
    assert(typeof this._screenOptions === 'object');
  }

  createBody() {
    return this._blessed.screen(this._screenOptions);
  }

  createEmpty(component) {
    return this._blessed.text({content: ''});
  }

  createText(text/*, component*/) {
    return this._blessed.text({ content: text });
  }

  updateText(node, text) {
    node.setContent(text);
    this._debouncedRender();
  }

  createElement(type, props/*, component*/) {
    assert(this._blessed[type]);

    const options = propsToNodeOptions(props);
    const element = this._blessed[type](options);
    this._attachEventListeners(element, props);
    return element;
  }

  _attachEventListeners(node, props) {
    for (const prop in props) {
      if (EVENT_PREFIX_REGEXP.test(prop)) {
        this.addEventListener(node, prop.slice(2).toLowerCase(), props[prop]);
      }
    }
  }

  appendChild(node, parent) {
    parent.append(node);
    this._debouncedRender();
  }

  removeChild(node, parent) {
    removeChild(node, parent);
    this._debouncedRender();
  }

  replaceChild(newChild, oldChild, parent) {
    replaceChild(newChild, oldChild, parent);
    this._debouncedRender();
  }

  insertAfter(node, after, parent) {
    parent = parent || after.parent;
    assert(parent != null);
    assert(after != null);
    assert(node != null);

    parent.insertAfter(node, after);
    this._debouncedRender();

    assert(parent.children.includes(node));
    assert(parent.children.indexOf(node) > parent.children.indexOf(after));
  }

  insertBefore(node, before, parent) {
    parent = parent || before.parent;
    assert(parent != null);
    assert(node != null);
    assert(before != null);

    parent.insertBefore(node, before);
    this._debouncedRender();

    assert(parent.children.includes(node));
    assert(parent.children.indexOf(node) < parent.children.indexOf(before));
  }

  addEventListener(node, eventName, eventHandler) {
    return node.on(eventName, eventHandler);
  }

  removeEventListener(node, eventName, eventHandler) {
    return node.removeListener(eventName, eventHandler);
  }

  setAttribute(node, propKey, propValue) {
    setAttribute(node, propKey, propValue);
    this._debouncedRender();
  }

  removeAttribute(node, propKey) {
    removeAttribute(node, propKey);
    this._debouncedRender();
  }

  setStyle(node, styleObject) {
    throw new Error('Not implemented');
  }

  beforeRender({/*element, hybrate, */container}) {
    assert(container instanceof this._blessed.Screen);
    assert(
      this._debouncedRender == null,
      'BlessedDriver.beforeRender should be called only once.'
    );

    const render = () => {
      container.render();
    };

    this._debouncedRender = debounce(render, 16);
  }

  afterRender({/*element, hybrate, */container}) {
    assert(this._debouncedRender != null);
    this._debouncedRender();
  }
}

