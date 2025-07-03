
# CodeCadence

**CodeCadence** is a full-stack web application meticulously crafted to help users enhance their typing proficiency specifically for programming code.  
It provides an interactive platform where developers and learners can engage in focused typing exercises using real code snippets — complete with instant, character-by-character feedback and features mimicking a real code editor.

---

## 🚀 Features

- **Interactive Typing**: Practice with various code snippets.
- **Real-time Feedback**: Instant highlighting of correct/incorrect characters.
- **Code-Editor Experience**: Supports Tab for indentation and auto-closing brackets.
- **Dynamic Snippets**: Fetches content from a dedicated backend API.

---

## 🛠️ Technologies

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- CORS

### Deployment
- Render

---

## ⚙️ Local Setup

### Clone the Repository

```bash
git clone https://github.com/Riyasamantaray23/DonkeyType.git
cd DonkeyType
```

---

### Backend (`server/`)

```bash
cd server
npm install

# Create a .env file in this directory with the following:
# MONGO_URI=your_mongodb_connection_string
# PORT=5000

npm start
```

---

### Frontend (`client/`)

```bash
cd ../client
npm install

# Create a .env file in this directory with the following:
# VITE_API_BASE_URL=http://localhost:5000

npm run dev
```

---

## 🧪 Usage

- Navigate to the frontend URL (local or live).
- Select a snippet.
- Start typing and improve your coding rhythm!

---

Happy Coding & Typing! 🎯💻
