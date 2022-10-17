import React, {useState, useEffect} from "react"
import {useStaticQuery, graphql} from "gatsby"
import {trackCustomEvent} from 'gatsby-plugin-google-analytics'

import Layout from "../components/layout"
import SEO from "../components/seo"
import FilterList from "../components/filterList"
import CustomElementCardList from "../components/customElementCardList"
import useDebounce from "../helpers/useDebounce"
import "./index.css"
import "../../shared/kentico-icons-v3.0.1.woff2"

const IndexPage = () => {
    const data = useStaticQuery(
        graphql`
            {
                categories: allElementsJson {
                    distinct(field: categories)
                }
                techs: allElementsJson {
                    distinct(field: tech)
                }
                elements: allElementsJson(sort: {fields: [core, title]}) {
                    edges {
                        node {
                            id
                            title
                            description
                            readmeUrl
                            thumbnailUrl {
                                publicURL
                            },
                            logoUrl,
                            categories
                            tech
                            core
                        }
                    }
                }
            }
        `
    )

    const [searchText, setSearchText] = useState("")

    const initialCategories = getInitialCategories(data.categories.distinct)
    const [categories, setCategories] = useState(initialCategories)

    const toggleCategory = category => {
        const index = categories.findIndex(
            stateCategory => stateCategory.title === category.title
        )
        const newCategories = [...categories]
        newCategories[index] = {...category, selected: !categories[index].selected}
        setCategories(newCategories)
    }

    const allElements = data.elements.edges.map(e => e.node)
    const [elements] = useState(allElements)
    const [filteredElements, setFilteredElements] = useState(allElements)
    const [activeFilter, setActiveFilter] = useState("")

    useEffect(() => {
        const activeCategories = categories
            .filter(c => c.selected)
            .map(c => c.title)
        const visibleElements = elements.filter(element => {
            const matchesCategoryFilter = satisfiesCategoryFilters(
                element,
                activeCategories
            )
            const matchesSearchTextFilter = satisfiesSearchTextFilter(
                element,
                searchText
            )

            return matchesCategoryFilter && matchesSearchTextFilter
        })

        setFilteredElements(visibleElements)

        const cleanedText = cleanText(searchText)
        const categoriesFlattened = categories
            .filter(c => c.selected)
            .map(c => c.title)
            .join(", ")
        if (cleanedText || categoriesFlattened) {
            setActiveFilter(
                `Text: ${cleanedText} | Categories: ${categoriesFlattened}`
            )
        } else {
            setActiveFilter(null)
        }
    }, [elements, searchText, categories, activeFilter])

    const debouncedActiveFilter = useDebounce(activeFilter, 1500)
    useEffect(() => {
        if (debouncedActiveFilter) {
            trackCustomEvent({
                category: "CESG",
                action: "Search",
                label: debouncedActiveFilter,
            })
        }
    }, [debouncedActiveFilter])

    return (
        <Layout>
            <SEO title="Gallery of Custom Element samples" />
            <a href="https://kontent.ai" target="_blank" rel="noopener noreferrer">
                <div id="logo"><img src="https://kontent.ai/img/general/kontent-by-kentico.svg"></img></div>
            </a>
            <section className="section grid">
                <div className="grid__row">
                    <div className="grid__col grid__col--12">
                        <div className="js-pagination-list">
                            <div className="heading heading--h2 heading--center heading--indent-content">
                                <h2>
                                    Gallery of Custom Element samples
                                    <strong className="highlight">.</strong>
                                </h2>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <div className="callout callout--is-warning callout--has-s-shadow">
                                    <div className="callout__title">
                                        <i className="callout__title-icon icon-exclamation-triangle" />
                                        Discontinuation notice
                                    </div>
                                    <div className="callout__message">
                                        <p>
                                            This website will be removed.
                                            If you want to check out our core integrations,
                                            please visit <a href="https://kontent.ai/integrations/">this page</a> or
                                            check out <a href="https://github.com/topics/kontent-ai-custom-element">this topic</a> on GitHub.
                                            If you want to make your integration visible,
                                            use the <a href="https://github.com/topics/kontent-ai-custom-element">topic</a> in your repository.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="js-integrations-filter">
                                    <FilterList
                                        title=""
                                        categories={categories}
                                        onToggleCategory={c => toggleCategory(c)}
                                        onChangeSearchText={t => setSearchText(t)}
                                    />
                                </div>
                            </div>
                            <div className="grid__row">
                                <div className="grid__col grid__col--12">
                                    <CustomElementCardList
                                        customElements={filteredElements}
                                        onToggleCategory={c => toggleCategory(c)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

function getInitialCategories(data) {
    return data
        .map(category => ({
            title: category,
            selected: false,
        }))
        .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
}

function satisfiesCategoryFilters(element, activeCategories) {
    if (activeCategories.length < 1) {
        return true
    } else if (!element.categories) {
        return false
    }
    return element.categories.some(c => activeCategories.includes(c))
}

function satisfiesSearchTextFilter(element, searchText) {
    const minLength = 3

    if (searchText && searchText.length >= minLength) {
        const titleHasMatch = textHasMatch(element.title, searchText)
        const descriptionHasMatch = textHasMatch(element.description, searchText)
        const categories = element.categories.join(" ")
        const categoriesHasMatch = textHasMatch(categories, searchText)
        const techHasMatch = element.tech ? textHasMatch(element.tech, searchText) : false
        const coreHasMatch = element.core ? textHasMatch("core integration", searchText) : false
        return titleHasMatch || descriptionHasMatch || categoriesHasMatch || techHasMatch || coreHasMatch
    }
    return true
}

function cleanText(text) {
    const ignoredCharsRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
    return text.toLowerCase().replace(ignoredCharsRegex, "")
}

function textHasMatch(text, searchText) {
    const searchTextCleanStartsWith = cleanText(searchText)
    const searchTextCleanIncludes = ` ${searchTextCleanStartsWith}`

    const textCleaned = cleanText(text)
    return (
        textCleaned.startsWith(searchTextCleanStartsWith) ||
        textCleaned.includes(searchTextCleanIncludes)
    )
}

export default IndexPage
