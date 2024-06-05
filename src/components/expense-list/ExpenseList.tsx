import { FC } from "react";
import { Expense } from "../../types";
import ExpenseTable from "./ExpenseTable";

interface ExpenseListProps {
  isLoading: boolean;
  expenses: Expense[];
  errorMsg: string;
  handleRefresh: () => void;
}

const ExpenseList: FC<ExpenseListProps> = ({
  isLoading,
  expenses,
  errorMsg,
  handleRefresh,
}) => {
  return (
    <div className="main-content">
      <h2 className="my-3 text-center">Expense List</h2>
      {isLoading && <p className="loading">Loading...</p>}
      <div className="parent-container">
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </div>

      {expenses.length > 0 ? (
        <ExpenseTable expenses={expenses} handleRefresh={handleRefresh} />
      ) : (
        // if isLoading is false and errorMsg is false, then the div containing the message "No matching expenses found." will be rendered
        !isLoading &&
        !errorMsg && (
          <div className="parent-container">
            <h4 className="error-msg">No matching expenses found.</h4>
          </div>
        )
      )}
    </div>
  );
};

export default ExpenseList;
