import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

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

    clear(): void {
        this.ul.innerHTML = '';
        this.completedUl.innerHTML = '';
    }

    render(fullList: FullList): void {
        this.clear();
        let hasCompletedTask = false;

        fullList.list.slice().reverse().forEach(item => {
            const li = document.createElement("li") as HTMLLIElement;
            li.className = "item";

            const check = document.createElement("input") as HTMLInputElement;
            check.type = "checkbox";
            check.id = item.id;
            check.tabIndex = 0;
            check.checked = item.checked;
            li.append(check);

            check.addEventListener('change', () => {
                item.checked = !item.checked;
                fullList.save();
                this.render(fullList);
            });

            const label = document.createElement("label") as HTMLLabelElement;
            label.htmlFor = item.id;
            label.textContent = item.item;
            li.append(label);

            const button = document.createElement("button") as HTMLButtonElement;
            button.className = 'button';
            button.textContent = 'X';
            li.append(button);

            button.addEventListener('click', () => {
                fullList.removeItem(item.id);
                this.render(fullList);
            });

            if (item.checked) {
                this.completedUl.append(li)
                hasCompletedTask = true;
            } else {
                this.ul.append(li);
            }
        });

        this.completedSection.style.display = hasCompletedTask ? 'block' : 'none';
    }
}
