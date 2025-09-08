import { MemoryStorage } from "./MemoryStorage";

export default class CookieStorage {
  name = "cookieStorage";
  #prefix = "EC868";
  #storage;

  #options = {
    expires: null,
    maxAge: null,
    domain: null,
    path: "/",
    secure: false,
    httpOnly: false,
    sameSite: "lax",
    partitioned: false,
  };

  constructor() {
    if (CookieStorage.isSupported) {
      this.#storage = this;
    } else {
      this.#storage = new MemoryStorage();
    }
  }

  get type() {
    return this.#storage.name;
  }

  get isSupported() {
    try {
      const key = "SBMSw5N1tf";
      document.cookie = `${key}=; Path=/`;
      document.cookie = `${key}=; Max-Age=0; Path=/`;
      return true;
    } catch {
      return false;
    }
  }

  get(field) {
    return this.#storage._getItem(field);
  }

  set(field, data, options = {}) {
    this.#storage._setItem(field, data, options);
  }

  remove(field, options = {}) {
    this.#storage._removeItem(field, options);
  }

  all() {
    return this.#storage._allItem();
  }

  //--------------------------------------------------------------------------
  // Private
  //--------------------------------------------------------------------------

  _allItem() {
    if (document.cookie === "") return {};

    const cookies = document.cookie.split("; ");

    const output = {};

    cookies.forEach((cookie) => {
      const cookieParts = cookie.split("=");

      const name = this.#decode(cookieParts.shift());
      const key = name.replace(`${this.#prefix}-`, "");

      let data = this.#decode(cookieParts.shift());

      try {
        data = JSON.parse(data);
      } catch {
        /* empty */
      }

      if (!output[key]) {
        output[key] = data;
      }
    });

    return output;
  }

  _getItem(field) {
    const cookies = this._allItem();
    return cookies[field] ?? null;
  }

  _setItem(field, data, options = {}) {
    const config = { ...this.#options, ...options };

    if (data === null) {
      return this._removeItem(field, options);
    }

    const cookieParts = [];

    const name = [];
    if (field.startsWith("__Host-")) {
      const fieldName = field.substring(7);
      name.push("__Host", this.#prefix, fieldName);
      config.secure = true;
      config.domain = null;
      config.path = "/";
    } else if (field.startsWith("__Secure-")) {
      const fieldName = field.substring(9);
      name.push("__Secure", this.#prefix, fieldName);
      config.secure = true;
    } else {
      name.push(this.#prefix, field);
    }

    const stringify = JSON.stringify(data);
    cookieParts.push(
      `${this.#encode(name.join("-"))}=${this.#encode(stringify)}`,
    );

    if (config.expires) {
      cookieParts.push(`Expires=${config.expires}`);
    }

    if (config.maxAge !== null) {
      cookieParts.push(`Max-Age=${config.maxAge}`);
    }

    if (config.domain) {
      cookieParts.push(`Domain=${config.domain}`);
    }

    if (config.path) {
      cookieParts.push(`Path=${config.path}`);
    }

    if (config.secure) {
      cookieParts.push("Secure");
    }

    if (config.httpOnly) {
      cookieParts.push("HttpOnly");
    }

    if (config.sameSite) {
      cookieParts.push(`SameSite=${config.sameSite}`);
    }

    if (config.partitioned) {
      cookieParts.push("Partitioned");
    }

    document.cookie = `${cookieParts.join("; ")};`;
  }

  _removeItem(field, options = {}) {
    const config = {
      ...options,
      maxAge: 0,
      expires: null,
    };

    this._setItem(field, "", config);
  }

  #encode(value) {
    return String(value).replace(/[,;"\\=\s%]/g, (character) => {
      return encodeURIComponent(character);
    });
  }

  #decode(value) {
    return decodeURIComponent(value);
  }
}
