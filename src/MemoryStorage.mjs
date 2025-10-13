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

  _getItem(field) {
    return this.#data[field] ?? null;
  }

  _setItem(field, data) {
    this.#data[field] = data;
  }

  _removeItem(field) {
    delete this.#data[field];
  }

  _allItem() {
    return this.#data;
  }
}
