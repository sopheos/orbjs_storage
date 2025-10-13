import { CookieStorage } from "./CookieStorage.mjs";
import { MemoryStorage } from "./MemoryStorage.mjs";

export class LocalStorage {
  name = "localStorage";
  #prefix;
  #storage;

  /**
   * @param {string} prefix
   */
  constructor(prefix) {
    this.#prefix = prefix;

    if (LocalStorage.isSupported) {
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
      const key = "WbhAnImMkw";
      window.localStorage.setItem(key, true);
      window.localStorage.removeItem(key);
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
    const name = this.#storage instanceof CookieStorage ? `L-${field}` : field;
    return this.#storage._getItem(name);
  }

  /**
   * @param {string} field 
   * @param {any} data
   */
  set(field, data) {
    const name = this.#storage instanceof CookieStorage ? `L-${field}` : field;
    this.#storage._setItem(name, data, {
      maxAge: 3600 * 24 * 365,
    });
  }

  /**
   * @param {string} field 
   */
  remove(field) {
    const name = this.#storage instanceof CookieStorage ? `L-${field}` : field;
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
      window.localStorage.getItem(`${this.#prefix}-${field}`) ?? null;
    return item ? JSON.parse(item) : null;
  }

  /**
   * @private
   */
  _setItem(field, data) {
    if (data === null) {
      return this._removeItem(field);
    }

    window.localStorage.setItem(
      `${this.#prefix}-${field}`,
      JSON.stringify(data),
    );
  }

  /**
   * @private
   */
  _removeItem(field) {
    window.localStorage.removeItem(`${this.#prefix}-${field}`);
  }
}
