import "../../styles/components/ui/CategoryBox.css";

const CategoryBox = ({ name, onClick, isActive }) => {
  return (
    <div
      className={`category-box ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default CategoryBox;