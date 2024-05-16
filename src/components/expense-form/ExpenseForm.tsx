import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Expense } from "../../types";
import "./ExpenseForm.css";

const ExpenseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Expense>();

  const onSubmit = (data: Expense) => {
    console.log("data", data);
  };

  console.log("errors", errors);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Form.Label>Expense Amount (In Euro)</Form.Label>
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
      <Form.Group className="mb-3">
        <Button type="submit" className="btn-success" variant="success">
          Add Expense
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ExpenseForm;
