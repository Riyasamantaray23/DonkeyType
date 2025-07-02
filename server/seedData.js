// server/seedData.js

const dotenv = require('dotenv');
const connectDB = require('./src/db'); // Path to your db.js
const CodeSnippet = require('./src/models/codesnippet'); // Path to your CodeSnippet model

// Load environment variables from .env file (for MONGO_URI)
dotenv.config({ path: './.env' }); // Ensure dotenv looks in the current directory

// Connect to the database
connectDB();

const seedSnippets = [
  {
    title: 'Basic JavaScript Loop',
    code: `for (let i = 0; i < 5; i++) {
  console.log(i);
}`,
    language: 'javascript',
    description: 'A simple for loop in JavaScript.',
    difficulty: 'Beginner',
  },
  {
    title: 'Python List Comprehension',
    code: `squares = [x**2 for x in range(10)]
print(squares)`,
    language: 'python',
    description: 'A concise way to create lists in Python.',
    difficulty: 'Intermediate',
  },
  {
    title: 'React Component Structure',
    code: `import React from 'react';

function MyComponent() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>This is a functional component.</p>
    </div>
  );
}

export default MyComponent;`,
    language: 'jsx', // or 'javascript' if preferred
    description: 'A basic functional component structure in React.',
    difficulty: 'Beginner',
  },
  {
    title: 'SQL Select Query',
    code: `SELECT id, name, email FROM users WHERE status = 'active';`,
    language: 'sql',
    description: 'Basic SQL query to select data from a table.',
    difficulty: 'Beginner',
  },
  {
    title: 'Asynchronous JavaScript (Async/Await)',
    code: `async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}`,
    language: 'javascript',
    description: 'Example of using async/await for fetching data.',
    difficulty: 'Advanced',
  },
];

const importData = async () => {
  try {
    await CodeSnippet.deleteMany(); // Clears existing snippets before adding new ones
    await CodeSnippet.insertMany(seedSnippets);
    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await CodeSnippet.deleteMany();
    console.log('Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

// To run: node seedData.js -d (to destroy) or node seedData.js (to import)
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}