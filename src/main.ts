import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';

// Initialize the application
const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  // Handle form submission to add a new item
  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement;
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();
    const input = document.getElementById("newItem") as HTMLInputElement;
    const newEntryText: string = input.value.trim();

    if (!newEntryText.length) {
      alert("Todo item cannot be empty.");
      return;
    }
    if (newEntryText.length > 20) {
      alert("Todo item cannot be longer than 20 characters.");
      return;
    }

    // Generate a unique ID for the new item
    const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1;

    // Create a new ListItem and add it to the list
    const newItem = new ListItem(itemId.toString(), newEntryText);
    fullList.addItem(newItem);

    // Render the updated list
    template.render(fullList);
    input.value = '';
  });

  // Clear button click event
  const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement;
  clearItems.addEventListener('click', (): void => {
    fullList.clearList();
    template.clear();
  });

  // Load existing items and render the list
  fullList.load();
  template.render(fullList);
}

// Initialize the app once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initApp);
