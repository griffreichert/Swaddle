# LEARNING #

### React & Redux ###

Actions are OBJECTS, they do not do the thing, not a function. Describer of what we are doing
We dispatch an action to go do the thing.
Dispatch is a property of store

### Import and Export ###

Put this in the file that defines the object/function:
```js
class ObjectName extends React.Component {
    render() {
        ...code...
    }
}
export default ObjectName;
```

Put this in the file that references the object/function:
```js
import ObjectName from '.path/to/thing';

<ObjectName/>
```