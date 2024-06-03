import { Form } from "react-bootstrap";
import "./SearchExpenses.css";
import { Expense } from "../../types";
import React, { FC, useEffect, useState } from "react";
import ExpenseTable from "../expense-list/ExpenseTable";

interface SearchExpensesProps {
  expenses: Expense[];
  handleRefresh: () => void;
}

const SearchExpenses: FC<SearchExpensesProps> = ({
  expenses,
  handleRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);

  const [expenseType, setExpenseType] = useState("");
  const [expenseYear, setExpenseYear] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevents from refreshing the page while submitting
    event.preventDefault();
    console.log("submitted");
    if (searchTerm.trim() !== "") {
      setFilteredExpenses(
        expenses.filter((expense) =>
          expense.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredExpenses(expenses);
    }
  };

  const handleFilterChange = (selectedOption: {
    type: string;
    value: string;
  }) => {
    const { type, value } = selectedOption;
    switch (type) {
      case "expense_type":
        // setting the particular value while using this particular filter
        setExpenseType(value);
        if (value) {
          setFilteredExpenses(
            expenses.filter((expense) => expense.expense_type === value)
          );
        } else {
          setFilteredExpenses(expenses);
        }
        // resetting other filters while using this one
        setExpenseYear("");
        setSortBy("");
        setSearchTerm("");
        break;
      case "expense_date": {
        setExpenseYear(value);
        const currentYear = new Date().getFullYear();
        if (value) {
          setFilteredExpenses(
            expenses.filter((expense) =>
              expense.expense_date.includes(
                value === "current_year"
                  ? `${currentYear}`
                  : `${currentYear - 1}`
              )
            )
          );
        } else {
          setFilteredExpenses(expenses);
        }
        // resetting other filters while using this one
        setExpenseType("");
        setSortBy("");
        setSearchTerm("");
        break;
      }
      case "sort_by":
        setSortBy(value);
        if (value) {
          // sorting be oldest
          if (value === "ascending") {
            setFilteredExpenses(
              expenses.slice().sort((firstExpense, secondExpense) => {
                if (firstExpense.expense_date < secondExpense.expense_date)
                  return -1;
                if (firstExpense.expense_date > secondExpense.expense_date)
                  return 1;
                return 0;
              })
            );
          } else if (value === "descending") {
            // sorting be newest
            setFilteredExpenses(
              expenses.slice().sort((firstExpense, secondExpense) => {
                if (firstExpense.expense_date < secondExpense.expense_date)
                  return 1;
                if (firstExpense.expense_date > secondExpense.expense_date)
                  return -1;
                return 0;
              })
            );
          }
        } else {
          setFilteredExpenses(expenses);
        }
        setExpenseType("");
        setExpenseYear("");
        setSearchTerm("");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="search-expenses">
        <h2 className="my-3 text-center">Search Expenses</h2>
        <div className="search-box">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="search-input">
              <Form.Control
                type="search"
                placeholder="Enter description to search and press Enter key"
                value={searchTerm}
                onChange={(event) => {
                  setExpenseType("");
                  setExpenseYear("");
                  setSortBy("");
                  setSearchTerm(event.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="filters">
          <div className="expense-type-filter">
            <Form.Label>Expense Type</Form.Label>
            <Form.Select
              aria-label="Select Expense Type"
              value={expenseType}
              onChange={(event) =>
                handleFilterChange({
                  type: "expense_type",
                  value: event.target.value,
                })
              }
            >
              <option value="">Select Expense Type</option>
              <option value="card">Card</option>
              <option value="cash">Cash</option>
            </Form.Select>
          </div>
          <div className="date-filter">
            <Form.Label>Expense Year</Form.Label>
            <Form.Select
              aria-label="Select Year"
              value={expenseYear}
              onChange={(event) =>
                handleFilterChange({
                  type: "expense_date",
                  value: event.target.value,
                })
              }
            >
              <option value="">Select Year</option>
              <option value="current_year">Current Year</option>
              <option value="previous_year">Previous Year</option>
            </Form.Select>
          </div>
          <div className="sort-filter">
            <Form.Label>Sort By</Form.Label>
            <Form.Select
              aria-label="Select Sort By"
              value={sortBy}
              onChange={(event) =>
                handleFilterChange({
                  type: "sort_by",
                  value: event.target.value,
                })
              }
            >
              <option value="">Select Sort By</option>
              <option value="ascending">Oldest First</option>
              <option value="descending">Newest First</option>
            </Form.Select>
          </div>
        </div>
      </div>
      <ExpenseTable expenses={filteredExpenses} handleRefresh={handleRefresh} />
    </div>
  );
};

export default SearchExpenses;
