import { CookieStorage } from "./CookieStorage";
import { MemoryStorage } from "./MemoryStorage";

export default class LocalStorage {
  name = "localStorage";
  #prefix;
  #storage;

  constructor(prefix) {
    this.prefix = prefix;

    if (LocalStorage.isSupported) {
      this.#storage = this;
    } else if (CookieStorage.isSupported) {
      this.#storage = new CookieStorage();
    } else {
      this.#storage = new MemoryStorage();
    }
  }

  get type() {
    return this.#storage.name;
  }

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

  get(field) {
    const name = this.#storage instanceof CookieStorage ? `L-${field}` : field;
    return this.#storage._getItem(name);
  }

  set(field, data) {
    const name = this.#storage instanceof CookieStorage ? `L-${field}` : field;
    this.#storage._setItem(name, data, {
      maxAge: 3600 * 24 * 365,
    });
  }

  remove(field) {
    const name = this.#storage instanceof CookieStorage ? `L-${field}` : field;
    this.#storage._removeItem(name);
  }

  //--------------------------------------------------------------------------
  // Private
  //--------------------------------------------------------------------------

  _getItem(field) {
    const item =
      window.localStorage.getItem(`${this.#prefix}-${field}`) ?? null;
    return item ? JSON.parse(item) : null;
  }

  _setItem(field, data) {
    if (data === null) {
      return this._removeItem(field);
    }

    window.localStorage.setItem(
      `${this.#prefix}-${field}`,
      JSON.stringify(data),
    );
  }

  _removeItem(field) {
    window.localStorage.removeItem(`${this.#prefix}-${field}`);
  }
}
