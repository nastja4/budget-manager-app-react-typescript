import { lazy } from "react";

// lazy allows to split the code and load components dynamically as they are needed (reducing the initial load time)
export const Layout = lazy(() => import("./components/Layout"));
export const ExpenseList = lazy(
  () => import("./components/expense-list/ExpenseList")
);
export const AddExpense = lazy(
  () => import("./components/add-expense/AddExpense")
);
export const EditExpense = lazy(
  () => import("./components/edit-expense/EditExpense")
);
export const Login = lazy(() => import("./components/login/Login"));
export const PrivateRoute = lazy(
  () => import("./components/private-route/PrivateRoute")
);
export const Profile = lazy(() => import("./components/profile/Profile"));
export const Register = lazy(() => import("./components/register/Register"));
export const SearchExpenses = lazy(
  () => import("./components/search-expense/SearchExpenses")
);
