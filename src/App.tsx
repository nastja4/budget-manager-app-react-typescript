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

// const sleep = () => new Promise((resolve) => setTimeout(resolve, 3000));

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      <Layout isLoggedIn={isLoggedIn}>
        <Routes>
          <Route
            path="/"
            element={
              <ExpenseList
                isLoading={isLoading}
                expenses={expenses}
                errorMsg={errorMsg}
                handleRefresh={handleRefresh}
              />
            }
          />
          <Route
            path="/add"
            element={<AddExpense handleRefresh={handleRefresh} />}
          />
          <Route
            path="/edit/:id"
            element={<EditExpense handleRefresh={handleRefresh} />}
          />
          <Route
            path="/search"
            element={
              <SearchExpenses
                isLoading={isLoading}
                errorMsg={errorMsg}
                expenses={expenses}
                handleRefresh={handleRefresh}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/register"
            element={<Register setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
