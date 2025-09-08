import { CookieStorage } from "./CookieStorage";
import { MemoryStorage } from "./MemoryStorage";

export default class SessionStorage {
  name = "sessionStorage";
  #prefix;
  #storage;

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

  get type() {
    return this.#storage.name;
  }

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

  get(field) {
    const name = this.#storage instanceof CookieStorage ? `S-${field}` : field;
    return this.#storage._getItem(name);
  }

  set(field, data) {
    const name = this.#storage instanceof CookieStorage ? `S-${field}` : field;
    this.#storage._setItem(name, data);
  }

  remove(field) {
    const name = this.#storage instanceof CookieStorage ? `S-${field}` : field;
    this.#storage._removeItem(name);
  }

  //--------------------------------------------------------------------------
  // Private
  //--------------------------------------------------------------------------

  _getItem(field) {
    const item =
      window.sessionStorage.getItem(`${this.#prefix}-${field}`) ?? null;
    return item ? JSON.parse(item) : null;
  }

  _setItem(field, data) {
    if (data === null) {
      return this._removeItem(field);
    }

    window.sessionStorage.setItem(
      `${this.#prefix}-${field}`,
      JSON.stringify(data),
    );
  }

  _removeItem(field) {
    window.sessionStorage.removeItem(`${this.#prefix}-${field}`);
  }
}
