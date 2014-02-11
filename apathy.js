var path = require('path');

/**
 * Checks if the given path is a descendent of another.
 *
 * @param {string} subject An absolute or relative path to check.
 * @param {string?} other A potential ancestor of `subject`. Defaults to the
 *     current working directory (`process.cwd()`).
 * @returns {boolean} `true` if either `subject` is a descendant of `other`,
 *     or if `subject` and `other` resolve to the same path.
 *
 * @examples
 * var cwd = path.basename(process.cwd());
 *
 * path.isDescendant('./foo');       // => true
 * path.isDescendant('/foo');        // => false
 * path.isDescendant('../foo');      // => false
 * path.isDescendant('../foo', '/'); // => true
 *
 * // If we're in the 'apathy' directory, this would be like '../apathy/foo',
 * // which is in fact a descendant.
 * path.isDescendant('../' + cwd + '/foo');
 * // => true
 *
 * // Contrived complex cases
 * path.isDescendant('../../foo/bar', '../../foo');             // => true
 * path.isDescendant('../../foo/../bar', '../../foo');          // => false
 * path.isDescendant('../' + cwd + '/.././' + cwd + '/./foo');  // => true
 * path.isDescendant('../' + cwd + '/../../' + cwd + '/./foo'); // => false
 */
path.isDescendant = function isDescendant(subject, other) {
  subject = path.resolve(subject);
  other   = path.resolve(other || process.cwd());

  while (true) {
    if (subject === other) {
      return true;
    }

    if (subject === '/') {
      break;
    }

    subject = path.dirname(subject);
  }

  return false;
};

/**
 * Checks if the given path is an ancestor of another.
 *
 * @param {string} subject An absolute or relative path to check.
 * @param {string?} other A potential descendant of `subject`. Defaults to the
 *     current working directory (`process.cwd()`).
 * @returns {boolean} `true` if either `subject` is an ancestor of `other`
 *     or if `subject` and `other` resolve to the same path. Otherwise, `false`.
 *
 * @examples
 * path.isAncestor('/');              // true
 * path.isAncestor('/', '/foo');      // true
 * path.isAncestor('../', '.');       // true
 * path.isAncestor('../', '..');      // true
 * path.isAncestor('../foo', '..');   // false
 * path.isAncestor('./foo');          // false
 */
path.isAncestor = function isAncestor(subject, other) {
  return path.isDescendant(other || process.cwd(), subject);
};

/**
 * Checks whether two paths are siblings (i.e. have the same parent).
 *
 * @param {string} subject An absolute or relative path to check.
 * @param {string?} other A potential sibling of `subject`. Defaults to the
 *     current working directory (`process.cwd()`).
 * @returns {boolean} `true` if `subject` and `other` reside in the same parent
 *     directory. Otherwise, `false`.
 *
 * @examples
 * path.isSibling('../foo');          // => true
 * path.isSibling('../../foo');       // => false
 * path.isSibling('../../foo', '..'); // => true
 * path.isSibling('./foo');           // => false
 * path.isSibling('./foo', './bar');  // => true
 */
path.isSibling = function isSibling(subject, other) {
  return path.dirname(path.resolve(subject)) ===
    path.dirname(path.resolve(other || process.cwd()));
};

/**
 * Checks whether two strings refer to the same logical path.
 *
 * @param {string} subject An absolute or relative path to check.
 * @param {string?} other Another path to check for equality. Defaults to the
 *     current working directory (`process.cwd()`).
 * @returns {boolean} `true` if `subject` and `other` refer to the same logical
 *     path. Otherwise, `false`.
 *
 * @examples
 * path.isEqual('.');                       // => true
 * path.isEqual('..');                      // => false
 * path.isEqual('./foo', 'foo');            // => true
 * path.isEqual('./foo/..', '.');           // => true
 * path.isEqual('./foo/../bar/.', './bar'); // => true
 */
path.isEqual = function isEqual(subject, other) {
  return path.resolve(subject) === path.resolve(other || process.cwd());
};

module.exports = path;
