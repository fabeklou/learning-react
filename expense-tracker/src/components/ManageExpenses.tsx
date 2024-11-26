import styled from "styled-components";
import { ExpenseType } from "../store";
import { useState } from "react";

import SelectCategory from "./SelectCategory";
import TableRow from "./TableRow";

const Box = styled.div`
  margin: 1rem 0;
`;

interface ManageExpensesProps {
  expenseList: Array<ExpenseType>;
  categoryList: Array<string>;
  onDelete: (expense: ExpenseType) => void;
}

const ManageExpenses = (props: ManageExpensesProps) => {
  const { expenseList, categoryList, onDelete } = props;

  const [currentCategory, setCurrentCategory] = useState("All categories");
  const titleList = ["Description", "Amount", "Category", "Action"];

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
  };

  const filterExpenseList = (category: string) => {
    return category === "All categories"
      ? expenseList
      : expenseList.filter((expense) => expense.category === category);
  };

  const calculateTotalExpense = (expenseList: Array<ExpenseType>) => {
    return expenseList
      .reduce((acc, expense) => expense.amount + acc, 0)
      .toFixed(2);
  };

  return (
    <div style={{ marginTop: "60px" }}>
      <Box>
        <SelectCategory
          categoryList={categoryList}
          currentCategory={currentCategory}
          onChange={handleCategoryChange}
        />
      </Box>
      <table className="table table-bordered">
        <thead>
          <tr>
            {titleList.map((title) => (
              <th scope="col" key={title}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterExpenseList(currentCategory).map((expense) => (
            <TableRow
              expense={expense}
              key={expense.description}
              onDelete={onDelete}
            />
          ))}
          <tr>
            <th scope="row">Total</th>
            <td scope="row">
              {"$" + calculateTotalExpense(filterExpenseList(currentCategory))}
            </td>
            <th scope="row"></th>
            <th scope="row"></th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageExpenses;
