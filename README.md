# Bunshack_Restaurant

✨Welcome to my Bunshack_Restaurant code repository✨. 

This is a full-stack project using **React** and **TypeScript** for the frontend and **.NET 8.0** with a **SQL database** for the backend. 

This project was inspired by a newly opened small restaurant owned by a friend of mine, and serves as a practical exercise to apply the skills I have learnt from [NZMSA 2024-Phase-1](https://github.com/NZMSA/2024-Phase-1). 

## Project Overview

This repository contains the full implementation of the Bunshack_Restaurant project, showcasing various frontend and backend features. 

You can watch a Demo video here: [Demo Video](https://www.youtube.com/watch?v=quDn6Wvvdrc), or You can view the deployed website on live: [Deployed Website](https://bunshack.azurewebsites.net/).

## Highlights

One aspect I am particularly proud of is that I completed this project 100% through **self-learning**. Despite not having covered similar courses during my university studies yet, I managed to overcome the steep learning curve and build a functional full-stack application. 

Integrating the **ASP.NET Core Identity framework** for authentication as well as using **SECRET** and **workflows** to delopy was also a self-taught endeavor. Although there is always room for improvement, this project marks a significant milestone in my learning journey.

## Running this project locally

### Prerequisites
- .NET 8.0 SDK
- Node.js and npm
- SQL Server (local or remote)

### Cloning the Repository
- Clone the repository to your local machine:
  ```
  git clone https://github.com/crystal941/Bunshack_Restaurant.git
  cd Bunshack_Restaurant
  ```
### Setting Up the Backend
- Navigate to the backend project directory:
  ```
  cd Bunshack_Restaurant.Server
  ```
- Update the connection string in the appsettings.json file to your local database connection string:
  ```
    "ConnectionStrings": {
    "DefaultConnection": "YOUR_LOCAL_DATABASE_CONNECTION_STRING"
  }
  ```
- In the program.cs file, uncomment the first line and comment out the second and third lines in the code block below:
  ```
  builder.Services.AddDbContext<ApplicationDbContext>(options =>
  {
      options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
      // var connectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_dbBunshack");
      // options.UseSqlServer(connectionString);
  });
  ```
- Run the following command to apply migrations and update the database:
  ```
  dotnet ef migrations add InitialCreate
  dotnet ef database update
  ```
- Start the backend server:
  ```
  dotnet run
  ```

### Setting Up the Frontend
- Navigate to the frontend project directory:
  ```
  cd ../bunshack_restaurant.client
  ```
- Install the necessary packages and Material-UI dependencies:
  ```
  npm install
  npm install @mui/material @emotion/react @emotion/styled
  ```
- Start the frontend development server:
  ```
  npm run dev
  ```

### Accessing the Application
- Open your browser and navigate to the URL shown in your terminal. By default, it is usually http://localhost:3000, but it might be different if the default port is already in use.


## Summary of Features

### Frontend

The frontend is built with React and TypeScript and includes the following *basic features*:
- React project with TypeScript
- MUI (Material-UI) styling library
- Responsive UI
- React Router
- Git Usage

*Advanced Features*:
- State Management
- Theme Toggle (Light/Dark Mode)

Detailed explanations of the frontend features can be found in the [Bunshack_Restaurant Frontend README.md](https://github.com/crystal941/Bunshack_Restaurant/blob/main/bunshack_restaurant.client/README.md).

### Backend

The backend is developed using C# with .NET 8 and includes the following *basic features*:
- Built using C# with .NET 8
- Usage of EF Core framework
- Persists data using a SQL database
- CRUD operations
- Git Usage

*Advanced Features*:
- ASP.NET Core Identity for user management
- Deployment with Azure

Detailed explanations of the backend features can be found in the [Bunshack_Restaurant Backend README.md](https://github.com/crystal941/Bunshack_Restaurant/blob/main/Bunshack_Restaurant.Server/README.md).

---

Thank you for checking out my project! Feel free to explore the detailed README files linked above for more comprehensive explanations of the features and implementation details of the Bunshack_Restaurant project. 

Let's keep calm and carry on coding! :blush: 
