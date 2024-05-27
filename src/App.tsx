// import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ExpenseList from "./components/expense-list/ExpenseList";
import AddExpense from "./components/add-expense/AddExpense";
import SearchExpense from "./components/search-expense/SearchExpense";
import Profile from "./components/profile/Profile";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "./utils/constants";
import EditExpense from "./components/edit-expense/EditExpense";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");
        const { data } = await axios.get(BASE_API_URL);
        console.log(data);
        setExpenses(data);
      } catch (error) {
        console.log(error);
        setErrorMsg("Something went wrong. Try again later.");
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
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <ExpenseList
                isLoading={isLoading}
                expenses={expenses}
                errorMsg={errorMsg}
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
          <Route path="/search" element={<SearchExpense />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
