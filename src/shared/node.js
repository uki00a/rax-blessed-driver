import assert from 'assert';
import merge from 'lodash.merge';

export function removeChild(node, parent) {
  assert(parent || node.parent);

  parent = parent || node.parent;

  parent.remove(node);
  node.destroy();

  assert(parent == null || !parent.children.includes(node));
}

export function replaceChild(newChild, oldChild, parent) {
  parent = parent || oldChild.parent;

  assert(parent);
  assert(parent.children.includes(oldChild));

  parent.insertBefore(newChild, oldChild);
  removeChild(oldChild, parent);

  assert(!parent.children.includes(oldChild));
  assert(parent.children.includes(newChild));
}

export function removeAttribute(node, propKey) {
  if (node[propKey]) {
    delete node[propKey];
  }

  if (node.style[propKey]) {
    delete node.style[propKey];
  }
}

// Borrowed from react-blessed
export function setAttribute(node, propKey, propValue) {
  assert(propKey !== 'style', 'style should be updated by setStyle()');

  if (propKey === 'selected' && node.select)
    node.select(typeof propValue === 'string' ? +propValue : propValue);
  
  // Setting label
  else if (propKey === 'label')
    node.setLabel(propValue);

  // Removing hoverText
  else if (propKey === 'hoverText' && !propValue) node.removeHover()

  // Setting hoverText
  else if (propKey === 'hoverText' && propValue) node.setHover(propValue)

  // Setting content
  else if (propKey === 'content')
    node.setContent(propValue);

  // Updating items
  else if (propKey === 'items')
    node.setItems(propValue);

  // Border edge case
  else if (propKey === 'border') setBorder(node, propValue);

  // Textarea value
  else if (propKey === 'propValue' && node.setValue)
    node.setValue(propValue);

  // Progress bar
  else if (propKey === 'filled' && node.filled !== propValue)
    node.setProgress(propValue);

  // Table / ListTable rows / data
  else if ((propKey === 'rows' || propKey === 'data') && node.setData)
    node.setData(propValue);

  else if (propKey === 'focused' && propValue && !node[propKey]) node.focus()

  // Raw attributes
  else if (RAW_ATTRIBUTES.has(propKey))
    node[propKey] = propValue;

}

function setBorder(node, propValue) {
  // dirty hack for avoiding an issue at https://github.com/chjj/blessed/pull/248
  const klass = Object.getPrototypeOf(node).constructor;
  const dummyNode = new klass({ border: propValue });
  node.border = dummyNode.border;
  node.style.border = dummyNode.style.border;
}

export function setStyle(node, style) {
  assert(style != null && typeof style === 'object');
  const normalizedStyle = normalizeStyle(style);
  node.style = merge({}, node.style, normalizedStyle);
}

function normalizeStyle(style) {
  const normalizedStyle = {};
  for (const key in style) {
    const value = style[key];
    if (value == null || value === '') {
      delete style[key];
    } else {
      normalizedStyle[key] = value;
    }
  }
  return normalizedStyle;
}

const RAW_ATTRIBUTES = new Set([
  // Alignment, Orientation & Presentation
  'align',
  'valign',
  'orientation',
  'shrink',
  'padding',
  'tags',
  'shadow',

  // Font-related
  'font',
  'fontBold',
  'fch',
  'ch',
  'bold',
  'underline',

  // Flags
  'clickable',
  'input',
  'keyable',
  'hidden',
  'visible',
  'scrollable',
  'draggable',
  'interactive',

  // Position
  'left',
  'right',
  'top',
  'bottom',
  'aleft',
  'aright',
  'atop',
  'abottom',

  // Size
  'width',
  'height',

  // Checkbox
  'checked',

  // Misc
  'name'
]);

export function propsToNodeOptions(props) {
  const {
    children, // eslint-disable-line no-unused-vars
    ...restProps
  } = props;
  return restProps;
}
