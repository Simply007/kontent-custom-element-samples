import React, { useState } from "react"
import PropTypes from "prop-types"

import FilterListItem from "./filterListItem"

function FilterList({
  title,
  categories,
  onToggleCategory,
  onChangeSearchText,
}) {
  const [searchText, setSearchText] = useState("")

  return (
    <div className="filter accordion">
      <div className="filter__heading accordion__heading">{title}</div>
      <div
        className="form__input"
        style={{
          display: "block",
        }}
      >
        <input
          type="text"
          className={`input input--text input--white js-input input--cesg ${searchText.length > 0 ? "js-filled" : ""
            }`}
          name="search"
          id="search"
          required=""
          maxLength="100"
          value={searchText}
          onChange={e => {
            onChangeSearchText(e.target.value)
            setSearchText(e.target.value)
          }}
        />
        <label htmlFor="search" className="label ">
          Search
        </label>
      </div>

      <div className="filter__checkboxes">
        <span className="heading" >Categories:</span>
        {categories.map((category, i) => (
          <FilterListItem
            category={category}
            id={i}
            key={i}
            onToggleCategory={c => onToggleCategory(c)}
          />
        ))}
      </div>
    </div >
  )
}

FilterList.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      selected: PropTypes.bool,
    })
  ),
  onToggleCategory: PropTypes.func,
  onChangeSearchText: PropTypes.func,
}

export default FilterList
