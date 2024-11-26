const expensesFromServer = [
    { description: "Gaming", amount: 45, category: "Entertainement" },
    { description: "Movie", amount: 12, category: "Entertainement" },
    { description: "Pizza", amount: 11, category: "Groceries" },
    { description: "Hot Dog", amount: 7, category: "Groceries" },
    { description: "Knif", amount: 3, category: "Utilities" },
  ];

const categoryList = ["Groceries", "Utilities", "Entertainement"] as const;

type ExpenseType = (typeof expensesFromServer)[number];

export {expensesFromServer, categoryList, type ExpenseType};
