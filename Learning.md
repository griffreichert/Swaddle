# LEARNING #

### React & Redux ###

Actions are OBJECTS, they do not do the thing, not a function. Describer of what we are doing
We dispatch an action to go do the thing.
Dispatch is a property of store

### Import and Export ###

Put this in the file that defines the object/function:
```js
export default class ObjectName extends React.Component {
    render() {
        ...code...
    }
}
```

Put this in the file that references the object/function:
```js
import ObjectName from '.path/to/thing';

<ObjectName/>
```

### Navigation ###