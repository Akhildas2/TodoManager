import { Item } from './BaseItem';
import ListItem from './ListItem';

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

    load(): void {
        const storedList: string | null = localStorage.getItem("myList");
        if (typeof storedList !== "string") return;
        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList);

        parsedList.forEach(itemObj => {
            const newItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked);
            FullList.instance.addItem(newItem);
        });
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list));
    }

    clearList(): void {
        this._list = [];
        this.save();
    }

    addItem(itemObj: Item): void {
        this._list.push(itemObj);
        this.save();
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }
}
