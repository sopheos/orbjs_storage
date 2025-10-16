export class MemoryStorage {
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
     * @returns {Record<string, any>}
     */
    all(): Record<string, any>;
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
    /**
     * @private
     */
    private _allItem;
    #private;
}
