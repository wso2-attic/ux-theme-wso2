Simple example:

```js
<div>
    <Paper height="100px" width="100px" />
    <Paper height="100px" width="100px" />
    <Paper height="100px" width="100px" />
    <Paper height="100px" width="100px" />
    <Paper height="100px" width="100px"/>
</div>
```

Circular Paper:

```js
<div>
    <Paper circle height="100px" width="100px" />
    <Paper circle height="100px" width="100px" />
    <Paper circle height="100px" width="100px" />
    <Paper circle height="100px" width="100px" />
    <Paper circle height="100px" width="100px" />
</div>
```

Paper with the Grid

```js
<Paper>
    <Grid container>    
        <Grid item xs={12} sm={6}>
            xs=12 sm=6
        </Grid>
        <Grid item xs={12} sm={6}>
            xs=12 sm=6
        </Grid>    
    </Grid>
</Paper>
```