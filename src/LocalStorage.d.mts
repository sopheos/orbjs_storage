export class LocalStorage {
    /**
     * @returns {boolean}
     */
    static get isSupported(): boolean;
    /**
     * @param {string} prefix
     */
    constructor(prefix: string);
    name: string;
    /**
     * @returns {string}
     */
    get type(): string;
    /**
     * @param {string} field
     * @returns {any}
     */
    get(field: string): any;
    /**
     * @param {string} field
     * @param {any} data
     */
    set(field: string, data: any): void;
    /**
     * @param {string} field
     */
    remove(field: string): void;
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
