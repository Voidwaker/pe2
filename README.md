![React](https://img.shields.io/badge/React-18.0.0-blue?style=for-the-badge&logo=react)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?style=for-the-badge&logo=bootstrap)
![Vite](https://img.shields.io/badge/Vite-6.0-yellow?style=for-the-badge&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![E2E Testing](https://img.shields.io/badge/Cypress-13.17.0-green?style=for-the-badge&logo=cypress)
[![Run Unit Tests](https://github.com/Voidwaker/pe2/actions/workflows/tests.yml/badge.svg)](https://github.com/Voidwaker/pe2/actions/workflows/tests.yml)
[![pages-build-deployment](https://github.com/Voidwaker/pe2/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/Voidwaker/pe2/actions/workflows/pages/pages-build-deployment)
[![Netlify Status](https://api.netlify.com/api/v1/badges/39cedb62-6284-4a8c-97cc-e5fba225d73a/deploy-status)](https://app.netlify.com/sites/holihub/deploys)
![ESLint](https://img.shields.io/badge/code%20style-eslint-brightgreen)
![Repo Size](https://img.shields.io/github/repo-size/Voidwaker/Holihub1)
![GitHub issues](https://img.shields.io/github/issues/Voidwaker/Holihub1)


# 🏡 Holihub - Accommodation Booking Platform  

Welcome to **Holidaze**, a modern and responsive **accommodation booking** application built with React! The platform allows users to **browse, book, and manage venues**, while venue managers can **create, update, and delete** their listings.

## 🚀 Project Overview  

Holidaze is a **front-end application** that interacts with the Noroff API to enable:  
✔️ Viewing and searching for venues.  
✔️ Booking a venue with date selection.  
✔️ Managing bookings and venues as a venue manager.  
✔️ User authentication (login, register, logout).  
✔️ Editing profiles and updating avatars.  

## 🛠️ Technologies Used  

- **React**: Component-based architecture.  
- **React Router**: Navigation between pages.  
- **Bootstrap**: Styling and layout.  
- **Fetch API**: Data retrieval from the backend API.  
- **Cypress** & **Vitest**: Testing (unit & E2E).  
- **Netlify**: Hosting for the live application.  

## 📂 Folder Structure  

```
/src  
│── _test_/  
│   │── auth.test.jsx
│   │── logout.test.jsx 
│── api/  
│   │── auth.js  
│   │── bookings.js  
│   │── create-api-key.js
│   │── venues.js  
│── components/  
│   │── Header.jsx  
│   │── Footer.jsx  
│   │── VenueCard.jsx  
│   │── Calendar.jsx  
│   │── createVenue.jsx  
│   │── login.jsx  
│   │── registration.jsx  
│   │── venueCard.jsx
│   │── venuelist.jsx
│── pages/  
│   │── HomePage.jsx  
│   │── VenueListPage.jsx  
│   │── VenueDetailsPage.jsx  
│   │── ProfilePage.jsx  
│   │── EditProfilePage.jsx  
│   │── CreateVenuePage.jsx  
│── api/  
│   │── auth.js  
│   │── bookings.js  
│   │── venues.js  
│── context/  
│   │── AuthContext.jsx  
│── hooks/  
│   │── useAuth.js  
│── styles/  
│   │── global.css  
│   │── profile.css  
│── App.jsx  
│── main.jsx  
```

---

## 🌐 Live Demo  

🔎 **[Holihub on Netlify](https://holihub.netlify.app/)**  

---

## 🤔 How to Run the Project Locally  

To run this project locally, follow these steps:

1️⃣ **Clone the repository:**  
```sh
git clone https://github.com/Voidwaker/pe2.git
cd pe2  
```

2️⃣ **Install dependencies:**  
```sh
npm install  
```

3️⃣ **Start the development server:**  
```sh
npm run dev  
```

4️⃣ **Open the app in your browser:**  
Go to `http://localhost:5173`  

---

## 💼 Features  

### **Homepage**  
✔️ Displays a list of venues fetched from the API.  
✔️ Search functionality for filtering venues.  

### **Venue Details Page**  
✔️ Shows venue information (name, description, price, amenities).  
✔️ Users can select check-in and check-out dates.  
✔️ Displays **availability calendar** and **ratings**.  

### **Booking System**  
✔️ Users can **book a venue** with selected dates.  
✔️ Venue managers can **view and manage** bookings.  

### **User Authentication**  
✔️ **Registration** for customers and venue managers.  
✔️ **Login & Logout** functionality.  
✔️ Stores session details securely in **localStorage**.  

### **Profile Management**  
✔️ Users can **edit their profile** and **update avatar**.  
✔️ Displays **booked venues** for customers.  
✔️ Venue managers see **created venues**.  

### **Venue Management (for venue managers)**  
✔️ **Create, edit, and delete** venues.  
✔️ View bookings for managed venues.  

---

## 🛠️ Testing  

- **Unit Testing**: `npm run test` (Vitest)  
- **E2E Testing**: `npx cypress open` (Cypress)  

---

## 🏡 Future Improvements  

🚀 Improve UI design and responsiveness.  
🚀 Add a **wishlist feature** for users to save favorite venues.  
🚀 Enhance **venue rating system**.  

---

## 🙌 Acknowledgments  

- **Noroff API** for backend services.  
- **React Documentation** for guidance.  
- **Bootstrap** for responsive styling.  

---

💻 **Developed by [Voidwaker](https://github.com/Voidwaker)**  

