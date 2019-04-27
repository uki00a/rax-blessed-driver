export function removeChild(node, parent) {
  parent = parent || node.parent;
  if (parent) {
    parent.removeChild(node);
    node.destroy();
  }
}

export function replaceChild(newChild, oldChild, parent) {
  parent = parent || oldChild.parentNode;
  // TODO correct?
  parent.insertBefore(newChild, oldChild);
  removeChild(oldChild, parent);
}

// Borrowed from react-blessed
export function setAttribute(node, propKey, propValue) {
  if (key === 'selected' && node.select)
    node.select(typeof propValue === 'string' ? +propValue : value);
  
  // Setting label
  else if (key === 'label')
    node.setLabel(value);

  // Removing hoverText
  else if (key === 'hoverText' && !value) node.removeHover()

  // Setting hoverText
  else if (key === 'hoverText' && value) node.setHover(value)

  // Setting content
  else if (key === 'content')
    node.setContent(value);

  // Updating style
  else if (key === 'style')
    node.style = merge({}, node.style, value);

  // Updating items
  else if (key === 'items')
    node.setItems(value);

  // Border edge case
  else if (key === 'border')
    node.border = merge({}, node.border, value);

  // Textarea value
  else if (key === 'value' && node.setValue)
    node.setValue(value);

  // Progress bar
  else if (key === 'filled' && node.filled !== value)
    node.setProgress(value);

  // Table / ListTable rows / data
  else if ((key === 'rows' || key === 'data') && node.setData)
    node.setData(value);

  else if (key === 'focused' && value && !node[key]) node.focus()

  // Raw attributes
  else if (RAW_ATTRIBUTES.has(key))
    node[key] = value;

}

export function propsToNodeOptions(props) {
  const {children, ...restProps} = props;
  return restProps;
}
