/**
 * @typedef CookieOption
 * @type {object}
 * @property {string | null} [expires] A GMT date
 * @property {number | null} [maxAge] In second
 * @property {number | null} [domain]
 * @property {string} [path]
 * @property {boolean} [secure]
 * @property {boolean} [httpOnly]
 * @property {"lax" | "strict" | "none"} [sameSite]
 * @property {boolean} [partitioned]
 */
export class CookieStorage {
    name: string;
    /**
     * @returns {string}
     */
    get type(): string;
    /**
     * @returns {boolean}
     */
    get isSupported(): boolean;
    /**
     * @param {string} field
     * @returns {any}
     */
    get(field: string): any;
    /**
     * @param {string} field
     * @param {any} data
     * @param {CookieOption} [options]
     */
    set(field: string, data: any, options?: CookieOption): void;
    /**
     * @param {string} field
     * @param {CookieOption} options
     */
    remove(field: string, options?: CookieOption): void;
    /**
     * @returns {Record<string, any>}
     */
    all(): Record<string, any>;
    /**
     * @private
     */
    private _allItem;
    /**
     * @private
     */
    private _getItem;
    /**
     * @private
     */
    private _setItem;
    /**
     * @private
     */
    private _removeItem;
    #private;
}
export type CookieOption = {
    /**
     * A GMT date
     */
    expires?: string | null;
    /**
     * In second
     */
    maxAge?: number | null;
    domain?: number | null;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "lax" | "strict" | "none";
    partitioned?: boolean;
};
