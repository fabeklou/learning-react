import styled from "styled-components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExpenseType } from "../store";
import { categoryList as catList } from "../store";

const Box = styled.div`
  margin: 1rem 0;
`;

const Label = styled.label`
  font-weight: 600;
`;

const schema = z.object({
  description: z
    .string({ required_error: "Description is required" })
    .min(3, { message: "Description must contain at least 3 character(s)" })
    .max(50, { message: "Description must contain at most 50 character(s)" }),
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .min(0.01, { message: "Amount must be at least 0.01" })
    .max(100_000, { message: "Amount must be at most 100_000" }),
  category: z.enum(catList, {
    errorMap: () => ({ message: "A valid category is required" }),
  }),
});

type FormData = z.infer<typeof schema>;

interface AddExpenseProps {
  categoryList: Array<string>;
  onSubmit: (data: FormData | ExpenseType) => void;
}

const AddExpense = (props: AddExpenseProps) => {
  const { categoryList, onSubmit } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form
      className="form"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <Box>
        <Label htmlFor="description" className="form-label">
          Description
        </Label>
        <input
          type="text"
          id="description"
          placeholder="Expense name..."
          className="form-control"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-danger fs-6">{errors.description.message}</p>
        )}
      </Box>
      <Box>
        <Label htmlFor="amount" className="form-label">
          Amount
        </Label>
        <input
          type="number"
          id="amount"
          placeholder="Expense amount..."
          className="form-control"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && (
          <p className="text-danger fs-6">{errors.amount.message}</p>
        )}
      </Box>
      <Box>
        <Label htmlFor="category" className="form-label">
          Category
        </Label>
        <select
          className="form-select"
          aria-label="Default select"
          {...register("category")}
        >
          <option value="" key="default">
            Choose a category
          </option>
          {categoryList.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger fs-6">{errors.category.message}</p>
        )}
      </Box>
      <Box>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Box>
    </form>
  );
};

export default AddExpense;
