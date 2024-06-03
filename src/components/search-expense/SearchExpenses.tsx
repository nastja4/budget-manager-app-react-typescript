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
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="filters">
          <div className="expense-type-filter">
            <Form.Label>Expense Type</Form.Label>
            <Form.Select aria-label="Select Expense Type">
              <option value="">Select Expense Type</option>
              <option value="card">Card</option>
              <option value="cash">Cash</option>
            </Form.Select>
          </div>
          <div className="date-filter">
            <Form.Label>Expense Year</Form.Label>
            <Form.Select aria-label="Select Year">
              <option value="">Select Year</option>
              <option value="current_year">Current Year</option>
              <option value="previous_year">Previous Year</option>
            </Form.Select>
          </div>
          <div className="sort-filter">
            <Form.Label>Sort By</Form.Label>
            <Form.Select aria-label="Select Sort By">
              <option value="">Select Sort By</option>
              <option value="oldest_first">Oldest First</option>
              <option value="newest_first">Newest First</option>
            </Form.Select>
          </div>
        </div>
      </div>
      <ExpenseTable expenses={filteredExpenses} handleRefresh={handleRefresh} />
    </div>
  );
};

export default SearchExpenses;
