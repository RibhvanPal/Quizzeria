
# Quizzeria - Programming Language Quiz App 🎯

**Quizzeria** is an interactive quiz app built with **Next.js** and **Tailwind CSS**, designed to help users practice and improve their programming skills through AI-generated quizzes. With support for multiple programming languages, levels, and goals, it’s ideal for students and job seekers alike.

---

## 📚 Table of Contents

- [About Quizzeria](#about-quizzeria)
- [Features](#features)
- [App Structure](#app-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [License](#license)
- [Contact](#contact)

---

## 🔍 About Quizzeria

Quizzeria provides AI-powered, topic-specific quizzes that help users improve their programming knowledge. Users can:

- Choose a **programming language** (e.g., Python, C, Java)
- Select a **difficulty level** (Beginner / Intermediate / Advanced)
- Choose a **goal** (College / Job)

It then fetches 10 customized questions from the **Gemini API** and displays them with live scoring and answer feedback. The app includes Google login via **NextAuth**, with backend integration coming soon.

---

## 🚀 Features

### 🏠 Home Section


- Clean landing interface with a strong call-to-action
- Quickly leads users to quiz categories


### 📘 Study Workflow

1. Select a **programming language**
2. Choose a **difficulty level** (Beginner, Intermediate, Advanced)
3. Select your **goal** (College or Job)
4. Automatically redirected to a quiz page with 10 questions from Gemini API

### 🧠 Quiz Page

- Displays questions with multiple-choice or text answers
- Submit button reveals:
  - Total score
  - Correct vs. incorrect answers
- Encourages review and retry

### 🔐 User Authentication

- Google login via **NextAuth.js**
- Login/logout button in the navbar
- *(Backend storage not yet active)*

### 📱 Responsive Design

- Fully optimized for desktop, tablet, and mobile devices

---

## 🏗️ App Structure

### 📌 Homepage
- **Home**: Landing page with a brief description 
- **Study**: Programming language list → prompts for level + goal → redirects to quiz

### 📌 Quiz Page
- Fetches 10 questions based on user choices
- Handles display, user input, scoring, and feedback

### 📌 Navbar
- Persistent login button via Google NextAuth

---

## 🛠️ Tech Stack

| Layer         | Technology                         |
|---------------|-------------------------------------|
| Frontend      | **Next.js**, **Tailwind CSS**       |
| Auth          | **NextAuth.js** (Google OAuth)      |
| API           | **Gemini API**                      |
| Database      | MongoDB *(planned)*                 |
| Tools         | Git, GitHub     |

---

## ⚙️ Getting Started

### ✅ Prerequisites

Install the following:

- Node.js (v16+)
- npm or yarn
- Git
- Gemini API Key
- Google OAuth credentials

---

### 🧩 Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/RibhvanPal/quizzeria.git
cd quizzeria
````

#### 2. Install Frontend Dependencies

```bash

npm install
```

#### 3. Configure Environment Variables

Create a `.env.local` file inside the `client` directory:

```env
GEMINI_API_KEY=
AUTH_SECRET="" 
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

#### 4. Start the App

```bash
npm run dev
```

#### 5. Visit the App

```
http://localhost:3000
```

> **Note:** Backend is not yet implemented. Quiz data is fetched client-side using Gemini API.

---


## 📄 License

Licensed under the **MIT License**. See [LICENSE](./LICENSE) for details.

---

## 📬 Contact

* **Project Lead**: Ribhvan Pal
* **Email**: \[[ribhvan102938@gmail.com](mailto:ribhvan102938@gmail.com)]

---

> ✨ Thanks for checking out Quizzeria! Contributions and feedback are welcome.

