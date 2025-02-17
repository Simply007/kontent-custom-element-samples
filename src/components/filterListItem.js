import React from "react"
import PropTypes from "prop-types"

function FilterListItem({ category, id, onToggleCategory }) {
  return (
    <span className="category-option">
      <a href="#"><span id={id} className={category.selected ? "tag categories tag--orange" : "tag categories"} onClick={() => onToggleCategory(category)}>
        {category.title}
      </span></a>
    </span>
  )
}

FilterListItem.propTypes = {
  category: PropTypes.shape({
    title: PropTypes.string,
    selected: PropTypes.bool
  }).isRequired,
  id: PropTypes.number,
  onToggleCategory: PropTypes.func
}

export default FilterListItem
