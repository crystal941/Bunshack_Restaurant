# Bunshack_Restaurant Frontend

✨Welcome to my Bunshack_Restaurant frontend code repository✨. This project is a web application built using **React** and **TypeScript**, styled with the **MUI (Material-UI) library**, and designed to be fully responsive for both desktop and mobile displays. The development environment is set up using **Vite** for fast and efficient builds.

## Basic Features

1. **React Project with TypeScript**
   - This project is developed using React, a popular JavaScript library for building user interfaces, and TypeScript, a statically typed superset of JavaScript.
   
2. **MUI Material Styling Library**
   - The application utilizes the MUI (Material-UI) library for styling components, ensuring a consistent and attractive look and feel across the entire app.

3. **Responsive UI**
   - The UI is designed to be responsive, making it user-friendly and visually appealing on both computer screens and mobile devices.

4. **React Router**
   - React Router is used for handling navigation within the application, enabling seamless transitions between different pages and components.

5. **Git Usage**
   - The project uses Git workflows for version control, making sure to commit changes with descriptive messages for new features or fixes.

## Advanced Features

1. **State Management**

   - The application uses state management to handle various aspects of its functionality. For example, in the code snippet below, several pieces of state are managed using the `useState` and `useEffect` hooks:
     - `loading`: Manages the loading state of the component
     - `error`: Holds any error message that might occur during data fetching or order submission.
     - `menus`: Stores the list of menu items fetched from the backend/server.
     - `orderMenus`: Keeps track of the selected menu items and their quantities for the order.
     - `totalPrice`: Calculates and stores the total price of the order based on the selected menu items.

Here is the example code snippet in NewOrder.tsx:
   ```typescript
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);
   const [menus, setMenus] = useState<Menu[]>([]);
   const [orderMenus, setOrderMenus] = useState<{ menuId: string; quantity: number }[]>([]);
   const [totalPrice, setTotalPrice] = useState<number>(0);

   useEffect(() => {
       const fetchMenus = async () => {
           try {
               const response = await fetch("/api/MenusController", {
                   method: "GET",
                   credentials: "include",
                   headers: {
                       "Content-Type": "application/json",
                       Accept: "application/json",
                   },
               });
               const data = await response.json();
               setMenus(data);
           } catch (error) {
               setError("Something went wrong. Please try again.");
           } finally {
               setLoading(false);
           }
       };

       if (loggedIn) {
           fetchMenus();
       } else {
           setLoading(false);
       }
   }, [loggedIn]);
   ```
2. **Theme Toggle (Light/Dark Mode)**
   
   - The application includes a feature to toggle between light and dark themes using Material UI's Theme Provider component. A toggle button is provided in the UI, allowing users to switch themes according to their preference.

## Project Structure

The project is organized as follows:
```
bunshack_restaurant.client/ # Root directory of the frontend
├── public/
├── src/
│ ├── assets/               # Folder for assests
| | ├── Banner.jpg
│ | └── ...
│ ├── components/           # Folder for reusable components
| | ├── Layout.tsx
│ | └── ...
│ ├── contexts/             # Folder for context providers
| | ├── AuthContext.tsx
│ | └── ...
│ ├── pages/                # Folder for pages
| | ├── HomePage.tsx
│ | └── ...
│ ├── styles/               # Folder for css styles
│ | ├── global.css
│ | └── ...
│ ├── types/                # Folder for type definitions
│ | ├── Order.ts
│ | └── ...
│ ├── App.tsx               # Main application component
│ ├── index.tsx             # Entry point of the application
│ └── ...
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
├── vite.config.ts
└── ...

