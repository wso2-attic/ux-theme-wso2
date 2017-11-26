Chip example:

```js
<div>
  <Chip label="This is a sample chip">
    <Avatar backgroundColor="#333" size="100" />
    
  </Chip>
  <Chip label="This is a sample chip" onClick={function(){console.log('This is a icon click')}} onRequestDelete={function(){console.log('This is a sample click event')}}/>
  <Chip label="This is a sample chip" onClick={function(){console.log('This is a sample click event')}}/>
</div>
```