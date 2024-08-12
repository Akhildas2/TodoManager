import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

//For rendering and managing the DOM
export default class ListTemplate implements DOMList {
    ul: HTMLUListElement;
    completedUl: HTMLUListElement;
    completedSection: HTMLElement;
    static instance: ListTemplate = new ListTemplate();

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement;
        this.completedUl = document.getElementById("completedListItems") as HTMLUListElement;
        this.completedSection = document.querySelector(".completedTasksContainer") as HTMLElement;
    }

    // Clears the lists from the DOM
    clear(): void {
        this.ul.innerHTML = '';
        this.completedUl.innerHTML = '';
    }

    // Renders the list items in the DOM
    render(fullList: FullList): void {
        this.clear();

        // Check if the list is empty
        if (fullList.list.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.className = "empty-message";
            emptyMessage.textContent = "No tasks available. Add a task to get started!";
            this.ul.append(emptyMessage);
            this.completedSection.style.display = 'none';
            return; // Exit early since there are no tasks to render
        }

        let hasCompletedTask = false;
        let hasUncompletedTask = false;

        fullList.list.slice().reverse().forEach(item => {
            const li = document.createElement("li") as HTMLLIElement;
            li.className = "item";

            // Create and configure checkbox input
            const check = document.createElement("input") as HTMLInputElement;
            check.type = "checkbox";
            check.id = item.id;
            check.tabIndex = 0;
            check.checked = item.checked;
            li.append(check);

            // Event listener for checkbox change
            check.addEventListener('change', () => {
                item.checked = !item.checked;
                fullList.save();
                this.render(fullList);
            });

            // Create and configure label
            const label = document.createElement("label") as HTMLLabelElement;
            label.htmlFor = item.id;
            label.textContent = item.item;
            li.append(label);

            // Create and configure edit 
            const editLink = document.createElement("a") as HTMLAnchorElement;
            editLink.href = "#";
            editLink.className = 'link edit-link';
            editLink.textContent = 'Edit';
            li.append(editLink);

            // Event listener for edit 
            editLink.addEventListener('click', (event: MouseEvent) => {
                event.preventDefault();
                const newText = prompt("Enter new text:", item.item);

                if (newText == null || newText.trim() === "") {
                    alert("Todo item cannot be empty.");
                    return;
                }

                if (newText.length > 50) {
                    alert("Todo item cannot be longer than 50 characters.");
                    return;
                }
                if (!isNaN(Number(newText))) {
                    alert("The input is a number. Please enter a valid task.");
                    return;
                }

                item.updateItemText(newText.trim());
                fullList.save();
                this.render(fullList);
            });

            // Create and configure delete button
            const deleteButton = document.createElement("button") as HTMLButtonElement;
            deleteButton.className = 'button';
            deleteButton.textContent = 'X';
            li.append(deleteButton);

            // Event listener for delete button
            deleteButton.addEventListener('click', () => {
                fullList.removeItem(item.id);
                this.render(fullList);
            });

            // Append item to the appropriate list
            if (item.checked) {
                this.completedUl.append(li);
                hasCompletedTask = true;
            } else {
                this.ul.append(li);
                hasUncompletedTask = true;
            }
        });

        //Show or hide the completed section
        this.completedSection.style.display = hasCompletedTask ? 'block' : 'none';
        // Check if there are no uncompleted tasks
        if (!hasUncompletedTask) {
            const emptyMessage = document.createElement("p");
            emptyMessage.className = "empty-message";
            emptyMessage.textContent = "No uncompleted tasks left. You're all caught up!";
            this.ul.append(emptyMessage);
        }
    }
}
