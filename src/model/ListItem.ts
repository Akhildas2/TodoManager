import { Item } from './BaseItem';

// Class that represents a list item and extends the abstract Item class
export default class ListItem extends Item {

    // To initialize a ListItem instance
    constructor(
        id: string,
        item: string,
        checked: boolean = false
    ) {
        // Call the parent class (Item) constructor
        super(id, item, checked);
    }

    // Implementation of the abstract method from the Item class
    updateItemText(newText: string): void {
        this.item = newText;
    }

}
