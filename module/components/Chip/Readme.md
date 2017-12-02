Chip example:
```js
  <Chip label="This is a sample chip with avatar">
    <Avatar size="30px" src='styleguide/avatar_02.jpg' alt="John Doe" />
  </Chip>
```

Chip with click event:

```js
  <Chip label="This is a sample clickable chip" onClick={function(){alert('You\'ve clicked on the chip.')}} />
```

Chip with delete event example:

```js
  <Chip label="This is a sample deletable chip" onRequestDelete={function(){alert('You\'ve clicked on the delete chip icon.')}}/>
```

Chip with click and delete event example:

```js
  <Chip label="This is a sample with both events chip" onClick={function(){alert('You\'ve clicked on the chip.')}} onRequestDelete={function(){alert('You\'ve clicked on the delete chip icon.')}}/>
```
