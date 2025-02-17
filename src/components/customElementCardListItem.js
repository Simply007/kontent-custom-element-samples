import React from "react"
import PropTypes from "prop-types"
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'

function CustomElementCardListItem({ customElement, onToggleCategory }) {
  return (
    < div className="card card--lg-2" >
      {
        customElement.core &&
        <div className="tag core tag--orange">CORE INTEGRATION</div>
      }
      <div className="card__content_bottom categories">
        {customElement.categories &&
          customElement.categories.map((c, i) => (
            <span
              key={i}
              className="tag categories"
              style={{
                margin: "3px",
                cursor: "pointer"
              }}
              onClick={() => onToggleCategory(c) }
            >
              {c}
            </span>
          ))}
      </div>
      <div className="card__content">
         <a
        href={customElement.readmeUrl}
        className="card-link-inner"
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => {
          trackCustomEvent({
            category: "CESG",
            action: "Click Detail",
            label: customElement.title
          })
        }}
      >
        <div className="card__heading  card__heading--small">
          <h3>
            {customElement.logoUrl &&
              <img src={customElement.logoUrl} style={{ width: "20px", display: "inline", verticalAlign: "middle", marginRight: "10px" }}></img>}
            {customElement.title}</h3>
        </div>
        <div
          className="card__image card__image--no-bg"
          style={{
            padding: "24px 0",
            height: "auto",
          }}
        >
          <img src={customElement.thumbnailUrl.publicURL} alt="Screenshot of element in action" />
        </div>
        <div className="card__description">
          <p dangerouslySetInnerHTML={{__html: customElement.description}}></p>
          </div></a>
        </div>
      
      <div className="card__content_bottom techs">
        <a style={{ float: "left", marginLeft: "20px", textDecoration: "none" }} href={`https://github.com/` + customElement.readmeUrl.split("/")[3]} target="_blank" rel="noopener noreferrer">{customElement.readmeUrl.split("/")[3]}</a>
        {customElement.tech &&
          <span
            className="tag tag--blue"
            style={{
              margin: "3px",
            }}
          >
            {customElement.tech}
          </span>
        }
      </div>
    </div >
  )
}

CustomElementCardListItem.propTypes = {
  customElement: PropTypes.object.isRequired,
}

export default CustomElementCardListItem
