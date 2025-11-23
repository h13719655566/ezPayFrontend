# 💸 EzPay Frontend User Interface (Frontend UI)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)

---

This is the user interface application for the EzPay payment system. It provides a dashboard and tools for users to initiate payments, register Webhook endpoints, and monitor payment activities.

## Technology Stack

The project is built using modern front-end technologies.

**Note:** Please update the badges for **Chakra UI** and **State Management Placeholder** if you are using different libraries.

## 🚀 Getting Started

### 1. Prerequisites

Before running the project locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### 2. Installation and Running

Execute the following commands from the **`frontend-ui`** directory:

1.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    # or yarn dev
    ```
    The application will typically start at `http://localhost:5173`.

### 3. Backend Dependency

This frontend application requires the **EzPay Backend API Service** to be running to function correctly.

Please ensure the backend service is operational and update the API request base URL in the frontend's configuration (usually via environment variables like `.env`).

---

## 🔗 Related Project Link

| Project | Description | Link |
| :--- | :--- | :--- |
| **Backend API Service** | The core service responsible for payment logic, database management, and Webhook delivery. | [https://github.com/h13719655566/ezyPay](https://github.com/h13719655566/ezyPay) |
| **Frontend UI** | *This repository.* | |