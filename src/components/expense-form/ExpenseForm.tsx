import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Expense } from "../../types";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ExpenseFormProps {
  onSubmitForm: (inputData: Expense) => Promise<boolean>;
  expense?: Expense | null;
}

const ExpenseForm: FC<ExpenseFormProps> = ({ onSubmitForm, expense }) => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Expense>();

  const { id, expense_type, expense_date, expense_amount, description } =
    expense || {};

  useEffect(() => {
    reset({
      expense_type,
      expense_date,
      expense_amount,
      description,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const navigate = useNavigate();

  const onSubmit = async (data: Expense) => {
    console.log("data", data);
    const isSuccess = await onSubmitForm(data);
    if (isSuccess) {
      if (!expense) {
        // reset for add expense
        reset();
      }
      setErrorMsg("");
      setSuccessMsg(`Expense ${expense ? "updated" : "added"} successfuly.`);
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/");
      }, 2000);
      // console.log("success");
    } else {
      setSuccessMsg("");
      setErrorMsg(
        `Error while ${expense ? "updating" : "adding"} expense. Try again.`
      );
      // console.log("failure");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {successMsg && <p className="success-msg">{successMsg}</p>}
      {errorMsg && <p className="error-msg">{errorMsg}</p>}

      <Form.Group className="mb-3" controlId="expense_type">
        <Form.Label>Expense Type</Form.Label>
        <Form.Select
          aria-label="Expense Type"
          {...register("expense_type", { required: true })}
        >
          <option value="">Select Expense Type</option>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
        </Form.Select>
        {errors.expense_type && (
          <p className="error-msg">Please enter expense type</p>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="expense_date">
        <Form.Label>Expense Date</Form.Label>
        <Form.Control
          type="date"
          {...register("expense_date", { required: true })}
        />
        {errors.expense_date && (
          <p className="error-msg">Please enter expense date</p>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="expense_amount">
        <Form.Label>Expense Amount (In EUR)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter amount"
          {...register("expense_amount", { required: true })}
        />
        {errors.expense_amount && (
          <p className="error-msg">Please enter expense amount</p>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <p className="error-msg">Please enter description</p>
        )}
      </Form.Group>

      <Form.Group>
        <Button type="submit" variant="success">
          {expense ? "Update" : "Add"} Expense
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ExpenseForm;
