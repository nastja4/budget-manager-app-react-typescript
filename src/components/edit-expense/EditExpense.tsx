import { useParams } from "react-router-dom";
import ExpenseForm from "../expense-form/ExpenseForm";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";
import { Expense } from "../../types";

interface EditExpenseProps {
  handleRefresh: () => void;
}

const EditExpense: FC<EditExpenseProps> = ({ handleRefresh }) => {
  const [expense, setExpense] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getExpense = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");
        const { data } = await axios.get(`${BASE_API_URL}/expenses/${id}`);
        setExpense(data);
        console.log("expense", data);
      } catch (error) {
        console.log(error);
        setErrorMsg(
          "Error while getting expense information. Try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };
    getExpense();
  }, [id]);

  const handleSubmit = async (inputData: Expense): Promise<boolean> => {
    try {
      const { data } = await axios.patch(`${BASE_API_URL}/expenses/${id}`, {
        ...inputData,
      });
      handleRefresh();
      console.log("updated", data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <div className="main-content">
      <h2 className="my-3 text-center">Edit Expense</h2>
      {isLoading && <p className="loading">Loading...</p>}
      <div className="parent-container">
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </div>

      <ExpenseForm onSubmitForm={handleSubmit} expense={expense} />
    </div>
  );
};

export default EditExpense;
