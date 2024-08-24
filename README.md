# Book Notes Page

A simple Node.js web application to manage book notes using Express, PostgreSQL, and Axios. This application allows users to add, view, edit, and delete book notes, and it retrieves book information from the Open Library API.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Database Setup](#database-setup)
- [Acknowledgments](#acknowledgments)

## Features

- **View Notes:** Display a list of book notes stored in a PostgreSQL database.
- **Add Notes:** Add new book notes with book title, note content, date, and retrieve additional book information using the Open Library API.
- **Edit Notes:** Edit existing book notes.
- **Delete Notes:** Delete existing book notes.
- **Responsive UI:** Uses EJS templates for rendering views.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- PostgreSQL installed and running.
- Basic knowledge of JavaScript and SQL.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/raivisneilands/capstone-project5-booknotes.git
   cd capstone-project5-booknotes

2. **Install dependencies**

   ```bash
   npm i or npm install

3. **Set up PostgreSQL database**

   Make sure you have a PostgreSQL database set up and running. You can create a database named booknotes and adjust the connection settings in the code if needed.

4. **Configure database connection**

   Update the pg.Client configuration in the code if your PostgreSQL server credentials are different:
   ```javascript
   const db = new pg.Client({
    user: "your-username",
    host: "localhost",
    database: "booknotes",
    password: "your-password",
    port: 5432
    });

5. **Start the server**

   ```bash
   node index.js

6. **Open your browser**

   Visit http://localhost:3000 to access the application.

## Usage

  - Viewing Notes: The homepage (/) displays all the book notes stored in the database.
  - Adding Notes: Use the /add-note route to add new notes. The form will submit data to /note-added.
  - Editing Notes: Use the /edit route to edit existing notes. The form will submit data to /note-edited.
  - Deleting Notes: Deleting a note can be done via the /delete route.
  
## Endpoints

 - GET /: Displays all book notes.
 - POST /add-note: Renders the form to add a new note.
 - POST /note-added: Adds a new book note to the database.
 - POST /delete: Deletes a book note from the database.
 - POST /edit: Renders the form to edit an existing note.
 - POST /note-edited: Updates an existing book note in the database.

## Database setup

  ```sql
  CREATE TABLE booknotes (
    id SERIAL PRIMARY KEY,
    book_name VARCHAR(255),
    book_note TEXT,
    date_added DATE,
    olid VARCHAR(50),
    author VARCHAR(255)
  );
  ```

## Acknowledgments

- Express.js for providing a robust web framework.
- Axios for making HTTP requests to the Open Library API.
- PostgreSQL for database management.
- Open Library API for book information.

