module.exports = {
  pathPrefix: "/kontent-custom-element-samples/gallery",
  siteMetadata: {
    title: `Gallery of Custom Elements`,
    description: `Samples of the HTML web pages that can be used as Custom Elements in Kentico Kontent. Custom elements help you with extending the basic functionality of Kentico Kontent UI and thus improving the content editing experience. Custom element is essentially a small HTML application that exists in a sandboxed <iframe> and interacts with the Kentico Kontent app via the Custom Elements API.`,
    author: `@kentico`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: "UA-69014260-7",
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `custom-element-sample-gallery`,
        short_name: `cesg`,
        start_url: `/`,
        icon: `src/images/kontent-icon.png`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `elements`,
        path: `${__dirname}/src/data/elements`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `didact gothic`
        ],
        display: `swap`
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-remove-serviceworker`,
  ],
}
