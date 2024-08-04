import { Item } from './BaseItem';
import ListItem from './ListItem';

// Defining the structure of a list
interface List {
    list: Item[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: Item): void,
    removeItem(id: string): void,
}

export default class FullList implements List {
    static instance: FullList = new FullList();
    private constructor(private _list: Item[] = []) { }

    get list(): Item[] {
        return this._list;
    }

    // For load local Storage
    load(): void {
        const storedList: string | null = localStorage.getItem("myList");
        if (!storedList) return;

        try {
            const parsedList: { _id: string; _item: string; _checked: boolean }[] = JSON.parse(storedList);
            parsedList.forEach(itemObj => {
                const newItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked);
                FullList.instance.addItem(newItem);
            });
        } catch (error) {
            console.error("Failed to parse stored list:", error);
        }
    }

    // Save the current list to local storage
    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list));
    }

    // Clears the list and updates localStorage
    clearList(): void {
        this._list = [];
        this.save();
    }

    // Adds a new item to the list and updates localStorage
    addItem(itemObj: Item): void {
        this._list.push(itemObj);
        this.save();
    }

    // Removes from the list and updates localStorage
    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }
}
