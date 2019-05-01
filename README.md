# rax-blessed-driver (WIP)

> blessed driver for Rax.

## Known issues
* Effect (hover, focus) do not work once mounted.

```javascript
// OK
<box style={{ hover: { bg: 'blue' } }}>
  ...
</box>

// NG
<box style={someCondition ? { hover: { bg: 'blue' } } : undefined}>
  ...
</box>
```
