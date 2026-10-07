import './App.css';
import AddUser from './adduser/AddUser';
import User from './getuser/User';
import Edit from "./updateuser/Edit";
import { createHashRouter, RouterProvider } from "react-router-dom";

function App() {
  const route = createHashRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <AddUser />,
    },
    {
      path: "/edit/:id",
      element: <Edit />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;