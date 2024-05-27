import { FC, useState } from "react";
import { Expense } from "../../types";
import { Button, Table } from "react-bootstrap";
import "./ExpensesTable.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";

interface ExpenseTableProps {
  expenses: Expense[];
  handleRefresh: () => void;
}

const ExpenseTable: FC<ExpenseTableProps> = ({ expenses, handleRefresh }) => {
  const [errorMsg, setErrorMsg] = useState("");

  const handleDelete = async (id: number) => {
    console.log("id", id);
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (shouldDelete) {
      try {
        setErrorMsg("");
        const { data } = await axios.delete(`${BASE_API_URL}/${id}`);
        console.log("data", data);
        handleRefresh();
      } catch (error) {
        console.log(error);
        setErrorMsg("Error while deleting the expense. Try again.");
      }
    }
    console.log("shouldDelete", shouldDelete);
  };

  return (
    <>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      <Table striped bordered hover responsive className="expense-list">
        <thead>
          <tr>
            <th className="heading">#</th>
            <th className="heading">Expense Type</th>
            <th className="heading">Expense Date</th>
            <th className="heading">Expense Amount</th>
            <th className="heading">Description</th>
            <th className="heading">Edit</th>
            <th className="heading">Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(
            (
              { expense_type, expense_date, expense_amount, description, id },
              index
            ) => {
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td className="expense-item">{expense_type}</td>
                  <td className="expense-item">{expense_date}</td>
                  <td className="expense-item">{expense_amount}</td>
                  <td className="expense-item">{description}</td>
                  <td>
                    <Link to={`/edit/${id}`}>
                      <Button variant="info" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </Table>
    </>
  );
};

export default ExpenseTable;
