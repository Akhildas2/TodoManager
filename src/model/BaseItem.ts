// Basic structure of an item
export interface BaseItem {
    id: string;
    item: string;
    checked: boolean;
}

// Abstract class that implements the BaseItem interface
export abstract class Item implements BaseItem {

    // Constructor to initialize the item properties
    constructor(
        private _id: string,
        private _item: string,
        private _checked: boolean = false,
    ) { }

    // Allow read and change 
    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get item(): string {
        return this._item;
    }

    set item(item: string) {
        this._item = item;
    }

    get checked(): boolean {
        return this._checked;
    }

    set checked(checked: boolean) {
        this._checked = checked;
    }

    // Abstract method that must be implemented by subclasses
    abstract updateItemText(newText: string): void;
}
