import { styled } from "styled-components";
import { useState } from "react";
import AddExpense from "./components/AddExpense";
import ManageExpenses from "./components/ManageExpenses";

import { ExpenseType, expensesFromServer } from "./store";

const Wrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 2.5rem auto;
  padding: 1rem;
`;

const ContentBox = styled.div`
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  padding: 1.5rem;
`;

const Title = styled.h1`
  font-weight: 800;
  margin-bottom: 1.5rem;
`;

function App() {
  const [expenseList, setExpenseList] = useState(expensesFromServer);
  const categoryList = ["Groceries", "Utilities", "Entertainement"];

  const onSubmit = (data: ExpenseType) => {
    setExpenseList([...expenseList, { ...data }]);
  };

  const onDelete = (expense: ExpenseType) => {
    const newExpenseList = expenseList.filter((item) => item !== expense);
    setExpenseList(newExpenseList);
  };

  return (
    <>
      <Wrapper>
        <ContentBox>
          <Title>Expense Tracker</Title>
          <AddExpense categoryList={categoryList} onSubmit={onSubmit} />
          <ManageExpenses
            expenseList={expenseList}
            categoryList={categoryList}
            onDelete={onDelete}
          />
        </ContentBox>
      </Wrapper>
    </>
  );
}

export default App;
