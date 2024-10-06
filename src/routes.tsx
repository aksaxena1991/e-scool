import { createBrowserRouter } from "react-router-dom";
import Categories from "./screens/add-categories/Categories";
import AddCity from "./screens/add-city/AddCity";
import AddClass from "./screens/add-class/AddClass";
import AddProduct from "./screens/add-product/AddProduct";
import AddSchool from "./screens/add-school/AddSchool";
import AddSubject from "./screens/add-subject/AddSubject";
import AddTeacher from "./screens/add-teacher/AddTeacher";
import AssignSubject from "./screens/assign-subject/AssignSubject";
import ErrorView from "./screens/error/ErrorView";
import Home from "./screens/home/Home";
import SubCategories from "./screens/sub-categories/SubCategories";
import Login from "./login/Login";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    // element: <App />,
    errorElement: <ErrorView />,
    children: [
      {
        path: "/dashboard-home",
        element: <Home />,
      },
      {
        path: "/addTeacher",
        element: <AddTeacher />,
      },
      {
        path: "/assignSubject",
        element: <AssignSubject />,
      },
      {
        path: "/addSubject",
        element: <AddSubject />,
      },
      {
        path: "/addSchool",
        element: <AddSchool />,
      },
      {
        path: "/addCity",
        element: <AddCity />,
      },
      {
        path: "/addClass",
        element: <AddClass />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/subCategories",
        element: <SubCategories />,
      },
      {
        path: "/addProduct",
        element: <AddProduct />,
      },
    ],
  },
]);

export default routes;

// import { createBrowserRouter } from "react-router-dom";
// import App from "./App";
// import ErrorView from "./screens/error/ErrorView";
// import Home from "./screens/home/Home";
// import AssignSubject from "./screens/assign-subject/AssignSubject";
// import AddSchool from "./screens/add-school/AddSchool";
// import AddCity from "./screens/add-city/AddCity";
// import AddClass from "./screens/add-class/AddClass";
// import Categories from "./screens/add-categories/Categories";
// import SubCategories from "./screens/sub-categories/SubCategories";
// import Login from "./login/Login";
// import AddProduct from "./screens/add-product/AddProduct";
// import AddTeacher from "./screens/add-teacher/AddTeacher";

// const routes = createBrowserRouter([
//   {
//     path: "/",
//     // element: <App />,
//     element: <Login />,
//     errorElement: <ErrorView />,
//     children: [
//       {
//         path: "/dashboard-home",
//         element: <Home />,
//       },
//       {
//         path: "/addTeacher",
//         element: <AddTeacher />,
//       },
//       {
//         path: "/assignSubject",
//         element: <AssignSubject />,
//       },
//       {
//         path: "/addSchool",
//         element: <AddSchool />,
//       },
//       {
//         path: "/addCity",
//         element: <AddCity />,
//       },
//       {
//         path: "/addClass",
//         element: <AddClass />,
//       },
//       {
//         path: "/categories",
//         element: <Categories />,
//       },
//       {
//         path: "/subCategories",
//         element: <SubCategories />,
//       },
//       {
//         path: "/addProduct",
//         element: <AddProduct />,
//       },
//       // Add other routes as needed
//     ],
//   },
//   // {
//   //   path: "/login",
//   //   element: <Login />,
//   // },
// ]);

// export default routes;
