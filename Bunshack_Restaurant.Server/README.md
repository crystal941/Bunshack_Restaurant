# Bunshack_Restaurant Backend

✨Welcome to my Bunshack_Restaurant backend code repository✨. This project is built using **C#** with **.NET 8**, utilizing **Entity Framework (EF) Core** for data access and persistence. The backend is designed to interact with a **SQL database**, offering **CRUD operations** to manage restaurant menu and order data effectively.

## Basic Features

1. **Built Using C# with .NET 8**
   - The backend is developed using C# language with .NET 8, providing a robust and scalable environment for building web applications.

2. **Usage of EF Core Framework**
   - Entity Framework (EF) Core is utilized for database access and management, simplifying data operations through its ORM capabilities.

3. **Persists Data Using a SQL Database**
   - Data is stored and managed in a SQL database, ensuring reliability and performance for handling restaurant-related information.

4. **CRUD Operations**
   - The backend supports CRUD (Create, Read, Update, Delete) operations, allowing seamless manipulation of restaurant menus, orders, and user data.

5. **Git Usage**
   - The project uses Git workflows for version control, making sure to commit changes with descriptive messages for new features or fixes.

## Advanced Features

1. **AspNetCore.Identity for User Management**
   - AspNetCore.Identity is integrated for user registration, login, and management. Features like signInManager and UserManager provide secure authentication and authorization functionalities.

2. **Deployment with Azure**
   - The backend is deployed using Azure, leveraging cloud services for scalability, reliability, and ease of deployment.

## Project Structure

The project is organized as follows:

```
Bunshack_Restaurant.Server/      # Roote directory of the backend
├── Controllers/                 # Controllers for handling HTTP requests
| ├── LoginController.cs
| └── ...
├── Data/                        # Data access layer, including EF Core migrations
| ├── Context
| | └── ApplicationDbContext.cs
| └── Migrations
| | ├── InitialMigration.cs
| | └── ...
├── Models/                      # Data models and entities
| ├── User.cs
| └── ...
├── Properties/                  # Project configuration files
| └── launchSettings.json
├── Repositories/                # Repository classes for data access logic
| ├── Abstract
| | ├── IMenuRepository.cs
| | └── ...
| └── Concrete
| | ├── MenuRepository.cs
| | └── ...
├── Program.cs                   # Main entry point of the application
├── appsettings.json 
└── ...
```
