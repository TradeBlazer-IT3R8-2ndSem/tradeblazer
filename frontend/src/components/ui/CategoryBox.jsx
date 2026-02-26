import "../../styles/components/ui/CategoryBox.css";

const CategoryBox = ({ name }) => {
  return (
    <div className="category-box">
      {name}
    </div>
  );
};

export default CategoryBox;