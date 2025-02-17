import React from "react"
import PropTypes from "prop-types"

import CustomElementCardListItem from "./customElementCardListItem"

function CustomElementCardList({ customElements, onToggleCategory }) {

  return (
    <div className="cards">
      {customElements.map(customElement => (
        <CustomElementCardListItem key={customElement.id} customElement={customElement} onToggleCategory={c => onToggleCategory({ title: c })} />
      ))}
    </div>
  )
}

CustomElementCardList.propTypes = {
  customElements: PropTypes.arrayOf(PropTypes.object)
}

export default CustomElementCardList
