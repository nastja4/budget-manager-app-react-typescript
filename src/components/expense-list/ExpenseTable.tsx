import { FC, useState } from "react";
import { Expense } from "../../types";
import { Button, Table } from "react-bootstrap";
import "./ExpensesTable.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";
import {
  getFormattedPrice,
  getFormatttedDate,
  getShortDescription,
} from "../../utils/functions";

interface ExpenseTableProps {
  expenses: Expense[];
  handleRefresh: () => void;
}

const ExpenseTable: FC<ExpenseTableProps> = ({ expenses, handleRefresh }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(-1);

  const handleDelete = async (id: number) => {
    // console.log("id", id);
    console.log("before");
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    console.log("after");
    if (shouldDelete) {
      try {
        setErrorMsg("");
        const { data } = await axios.delete(`${BASE_API_URL}/expenses/${id}`);
        console.log("data", data);
        handleRefresh();
      } catch (error) {
        console.log(error);
        setErrorMsg("Error while deleting the expense. Try again.");
      }
    }
    setDeleteIndex(-1);
    // console.log("shouldDelete", shouldDelete);
  };

  // console.log("deleteIndex", deleteIndex);

  return (
    <>
      <div className="parent-container">
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </div>
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
                <tr
                  key={id}
                  className={`${id === deleteIndex ? "active" : ""}`}
                >
                  <td>{index + 1}</td>
                  <td className="expense-item">{expense_type}</td>
                  <td className="expense-item">
                    {getFormatttedDate(expense_date)}
                  </td>
                  <td className="expense-item">
                    {getFormattedPrice(expense_amount)}
                  </td>
                  <td className="expense-item" title={description}>
                    {getShortDescription(description)}
                  </td>
                  <td>
                    <Link to={`/edit/${id}`}>
                      <Button
                        variant="info"
                        size="sm"
                        className="button btn-edit"
                      >
                        Edit
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      // setDeleteIndex(id) sets the deleteIndex to this id
                      onMouseDown={() => setDeleteIndex(id)}
                      onClick={() => handleDelete(id)}
                      className="button btn-delete"
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
