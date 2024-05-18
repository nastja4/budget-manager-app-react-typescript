import { useParams } from "react-router-dom";
import ExpenseForm from "../expense-form/ExpenseForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";

const EditExpense = () => {
  const [expense, setExpense] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getExpense = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");
        const { data } = await axios.get(`${BASE_API_URL}/${id}`);
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

  const handleSubmit = async (): Promise<boolean> => {
    return true;
  };

  return (
    <div className="main-content">
      <h2 className="my-3 text-center">Edit Expense</h2>
      {isLoading && <p className="loading">Loading...</p>}
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      <ExpenseForm onSubmitForm={handleSubmit} expense={expense} />
    </div>
  );
};

export default EditExpense;
