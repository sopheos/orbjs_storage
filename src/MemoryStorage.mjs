export class MemoryStorage {
  name = "memoryStorage";
  #data = {};

  get type() {
    return this.name;
  }

  get(field) {
    return this._getItem(field);
  }

  set(field, data) {
    this._setItem(field, data);
  }

  remove(field) {
    this._removeItem(field);
  }

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
