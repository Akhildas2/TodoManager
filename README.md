# Todo Manager

This is a simple task management application built with HTML, CSS, and TypeScript. The application allows you to add, remove, and mark tasks as completed. Completed tasks are displayed separately from pending tasks.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)

## Features

- Add new tasks
- Mark tasks as completed
- Remove tasks
- Persist tasks in `localStorage`
- Separate display for completed and pending tasks

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Akhildas2/TodoManager.git
   ```
2. Navigate to the project directory:
   ```sh
   cd TodoManager
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

1. Open the application in your browser:
   ```sh
   http://localhost:5173/
   ```
2. Use the input field to add a new task.
3. Click the checkbox to mark a task as completed.
4. Click the "X" button to remove a task.
5. Click the "Clear" button to remove all tasks.

## File Structure

```sh
Todo Manager
│
├── public
│└── favicon.ico
│
├── src
│ ├── css
│ │ └── style.css
│ ├── model
│ │ ├── BaseItem.ts
│ │ ├── FullList.ts
│ │ └── ListItem.ts
│ ├── templates
│ │ └── ListTemplate.ts
│ └── main.ts
│
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

### File Descriptions

- **index.html**: The main HTML file.
- **src/css/style.css**: The CSS styles for the application.
- **src/model/BaseItem.ts**: Defines the `BaseItem` interface and `Item` abstract class.
- **src/model/FullList.ts**: Implements the `FullList` class, managing the list of items.
- **src/model/ListItem.ts**: Implements the `ListItem` class, representing a single task.
- **src/templates/ListTemplate.ts**: Handles the rendering of tasks to the DOM.
- **src/main.ts**: The entry point of the application, initializing the app and adding event listeners.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.
