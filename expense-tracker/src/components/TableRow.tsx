import { RiDeleteBin2Line } from "react-icons/ri";
import { ExpenseType } from "../store";

interface TableRowProps {
  expense: ExpenseType;
  onDelete: (expense: ExpenseType) => void;
}

const TableRow = (props: TableRowProps) => {
  const { expense, onDelete } = props;
  return (
    <tr>
      <th scope="row">{expense.description}</th>
      <td>{"$" + expense.amount}</td>
      <td>{expense.category}</td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={() => onDelete(expense)}
        >
          Delete <RiDeleteBin2Line fontSize={18} />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
