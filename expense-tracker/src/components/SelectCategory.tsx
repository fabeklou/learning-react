import { ChangeEvent } from "react";

interface SelectCategoryProps {
  categoryList: Array<string>;
  currentCategory: string;
  onChange: (category: string) => void;
}

const SelectCategory = (props: SelectCategoryProps) => {
  const { categoryList, currentCategory, onChange } = props;
  const defaultCategory = ["All categories"];

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={handleChange}
    >
      {defaultCategory.concat(categoryList).map((category) =>
        category === currentCategory ? (
          <option value={category} key={category} selected>
            {category}
          </option>
        ) : (
          <option value={category} key={category}>
            {category}
          </option>
        )
      )}
    </select>
  );
};

export default SelectCategory;
