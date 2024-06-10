import React, { useEffect, useState, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
// import Layout from "./components/Layout";
// import ExpenseList from "./components/expense-list/ExpenseList";
// import AddExpense from "./components/add-expense/AddExpense";
// import EditExpense from "./components/edit-expense/EditExpense";
// import Login from "./components/login/Login";
// import PrivateRoute from "./components/private-route/PrivateRoute";
// import Profile from "./components/profile/Profile";
// import Register from "./components/register/Register";
// import SearchExpenses from "./components/search-expense/SearchExpenses";

// lazy allows to split the code and load components dynamically as they are needed (reducing the initial load time)
const Layout = lazy(() => import("./components/Layout"));
const ExpenseList = lazy(() => import("./components/expense-list/ExpenseList"));
const AddExpense = lazy(() => import("./components/add-expense/AddExpense"));
const EditExpense = lazy(() => import("./components/edit-expense/EditExpense"));
const Login = lazy(() => import("./components/login/Login"));
const PrivateRoute = lazy(
  () => import("./components/private-route/PrivateRoute")
);
const Profile = lazy(() => import("./components/profile/Profile"));
const Register = lazy(() => import("./components/register/Register"));
const SearchExpenses = lazy(
  () => import("./components/search-expense/SearchExpenses")
);

import useLocalStorage from "./custom-hooks/useLocalStorage";
import { BASE_API_URL } from "./utils/constants";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [refresh, setRefresh] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");
        const { data } = await axios.get(`${BASE_API_URL}/expenses`);
        console.log(data);
        setExpenses(data);
      } catch (error) {
        console.log(error);
        setErrorMsg("Error while getting list of expenses. Try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getExpenses();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh((refresh) => !refresh);
  };

  return (
    <BrowserRouter>
      <React.Suspense fallback={<p className="loading">Loading...</p>}>
        <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <ExpenseList
                    isLoading={isLoading}
                    expenses={expenses}
                    errorMsg={errorMsg}
                    handleRefresh={handleRefresh}
                  />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/add"
              element={
                isLoggedIn ? (
                  <AddExpense handleRefresh={handleRefresh} />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <EditExpense handleRefresh={handleRefresh} />
                </PrivateRoute>
              }
            />
            <Route
              path="/search"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <SearchExpenses
                    isLoading={isLoading}
                    errorMsg={errorMsg}
                    expenses={expenses}
                    handleRefresh={handleRefresh}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Profile />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="/register"
              element={
                !isLoggedIn ? (
                  <Register setIsLoggedIn={setIsLoggedIn} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/login"
              element={
                !isLoading ? (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
