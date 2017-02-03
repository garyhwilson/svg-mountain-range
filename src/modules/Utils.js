/**
 * @class Utils
 */


export default class {
  /**
   * Utility method for determing if variable is an object.
   *
   * @memberOf Utils
   * @param {Object} val - The value to be tested if an object or not.
   * @returns {boolean} Returns TRUE if the parameter is an object, otherwise FALSE.
   */
  isObject(val) {
    return (val && typeof val === 'object' && !Array.isArray(val) && val !== null);
  }

  /**
   * Perform a deep merge from source onto target.
   *
   * @memberOf Utils
   * @param {Object} target
   * @param {Object} source
   * @returns {Object} Returns the results of the merge between the target and source objects.
   */
  mergeDeep(target, source) {
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          this.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      });
    }

    return target;
  }
}
