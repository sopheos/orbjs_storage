export class MemoryStorage {
  name = "memoryStorage";
  #data = {};

  /**
   * @returns {string}
   */
  get type() {
    return this.name;
  }

  /**
   * @param {string} field 
   * @returns {any}
   */
  get(field) {
    return this._getItem(field);
  }

  /**
   * @param {string} field 
   * @param {any} data 
   */
  set(field, data) {
    this._setItem(field, data);
  }

  /**
   * @param {string} field 
   */
  remove(field) {
    this._removeItem(field);
  }

  /**
   * @returns {Record<string, any>}
   */
  all() {
    return this._allItem();
  }

  //--------------------------------------------------------------------------
  // Private
  //--------------------------------------------------------------------------

  /**
   * @private
   */
  _getItem(field) {
    return this.#data[field] ?? null;
  }

  /**
   * @private
   */
  _setItem(field, data) {
    this.#data[field] = data;
  }

  /**
   * @private
   */
  _removeItem(field) {
    delete this.#data[field];
  }

  /**
   * @private
   */
  _allItem() {
    return this.#data;
  }
}
