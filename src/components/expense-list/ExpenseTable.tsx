import { FC } from "react";
import { Expense } from "../../types";
import { Button, Table } from "react-bootstrap";
import "./ExpensesTable.css";

interface ExpenseTableProps {
  expenses: Expense[];
}

const ExpenseTable: FC<ExpenseTableProps> = ({ expenses }) => {
  return (
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
                  <Button variant="info" size="sm">
                    Edit
                  </Button>
                </td>
                <td>
                  <Button variant="danger" size="sm">
                    Delete
                  </Button>
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </Table>
  );
};

export default ExpenseTable;
