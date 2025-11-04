import { CookieStorage } from "./CookieStorage.mjs";
import { MemoryStorage } from "./MemoryStorage.mjs";

export class SessionStorage {
  name = "sessionStorage";
  #prefix;
  #storage;

  /**
   * @param {string} prefix
   */
  constructor(prefix) {
    this.#prefix = prefix;

    if (SessionStorage.isSupported) {
      this.#storage = this;
    } else if (CookieStorage.isSupported) {
      this.#storage = new CookieStorage();
    } else {
      this.#storage = new MemoryStorage();
    }
  }

  /**
   * @returns {string}
   */
  get type() {
    return this.#storage.name;
  }

  /**
   * @returns {boolean}
   */
  static get isSupported() {
    try {
      const key = "Ai6VttYuW0";
      window.sessionStorage.setItem(key, true);
      window.sessionStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * @param {string} field 
   * @returns {any}
   */
  get(field) {
    const name = this.#storage instanceof CookieStorage ? `S-${field}` : field;
    return this.#storage._getItem(name);
  }

  /**
   * @param {string} field 
   * @param {any} data
   */
  set(field, data) {
    const name = this.#storage instanceof CookieStorage ? `S-${field}` : field;
    this.#storage._setItem(name, data);
  }

  /**
   * @param {string} field 
   */
  remove(field) {
    const name = this.#storage instanceof CookieStorage ? `S-${field}` : field;
    this.#storage._removeItem(name);
  }

  //--------------------------------------------------------------------------
  // Private
  //--------------------------------------------------------------------------

  /**
   * @private
   */
  _getItem(field) {
    const item =
      window.sessionStorage.getItem(`${this.#prefix}-${field}`) ?? null;
    try {
      return item ? JSON.parse(item) : null;
    } catch {
      return null
    }
  }

  /**
   * @private
   */
  _setItem(field, data) {
    if (data === null) {
      return this._removeItem(field);
    }

    window.sessionStorage.setItem(
      `${this.#prefix}-${field}`,
      JSON.stringify(data),
    );
  }

  /**
   * @private
   */
  _removeItem(field) {
    window.sessionStorage.removeItem(`${this.#prefix}-${field}`);
  }
}
