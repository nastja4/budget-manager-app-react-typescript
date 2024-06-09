// import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ExpenseList from "./components/expense-list/ExpenseList";
import AddExpense from "./components/add-expense/AddExpense";
import SearchExpenses from "./components/search-expense/SearchExpenses";
import Profile from "./components/profile/Profile";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "./utils/constants";
import EditExpense from "./components/edit-expense/EditExpense";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import useLocalStorage from "./custom-hooks/useLocalStorage";
import PrivateRoute from "./components/private-route/PrivateRoute";

// const sleep = () => new Promise((resolve) => setTimeout(resolve, 3000));

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
        // await sleep();
        // throw new Error();
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
    </BrowserRouter>
  );
};

export default App;
