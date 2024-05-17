import { FC } from "react";
import { Expense } from "../../types";
import ExpenseTable from "./ExpenseTable";

interface ExpenseListProps {
  isLoading: boolean;
  expenses: Expense[];
  errorMsg: string;
}

const ExpenseList: FC<ExpenseListProps> = ({
  isLoading,
  expenses,
  errorMsg,
}) => {
  return (
    <div className="main-content">
      <h2 className="my-3 text-center">Expense List</h2>
      {isLoading && <p className="loading">Loading...</p>}
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      <ExpenseTable expenses={expenses} />
    </div>
  );
};

export default ExpenseList;
