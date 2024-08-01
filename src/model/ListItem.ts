import { Item } from './BaseItem';

export default class ListItem extends Item {
    constructor(
        id: string,
        item: string,
        checked: boolean = false
    ) {
        super(id, item, checked);
    }
    display(): string {
        return `${this.item} - ${this.checked ? "Completed" : "Pending"}`;
    }
}
