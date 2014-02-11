# apathy

A micro-library that extends the [built-in `path` module](http://nodejs.org/api/path.html)
with some ancestry-related methods:

- `isDescendant`
- `isAncestor`
- `isSibling`
- `isEqual`

## Usage

```javascript
var path = require('apathy');

// By default looks at paths relative to the current working directory
path.isDescendant('.');      // => true
path.isDescendant('./foo');  // => true
path.isDescendant('../foo'); // => false

// You can also check whether a path is a descendant of some arbitrary other
// path by specifying it as a second parameter
path.isDescendant('foo/bar', 'foo'); // => true
path.isDescendant('foo/bar', 'bar'); // => false

// isAncestor is just the opposite of isDescendant
path.isAncestor('/');              // true
path.isAncestor('/', '/foo');      // true
path.isAncestor('../', '.');       // true

// isSibling does exactly what you think
path.isSibling('./foo');           // => false
path.isSibling('../foo');          // => true
path.isSibling('../../foo');       // => false
path.isSibling('../../foo', '..'); // => true

// isEqual checks if two paths refer to the same place
path.isEqual('./foo', 'foo');            // => true
path.isEqual('./foo/..', '.');           // => true
path.isEqual('./foo/../bar/.', './bar'); // => true
```
