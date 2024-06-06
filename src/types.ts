export interface Expense {
  id: number;
  expense_type: string;
  expense_date: string;
  expense_amount: string;
  description: string;
}

export interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  c_password: string;
}
