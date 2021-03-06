require("dotenv").config(),

module.exports = {
  siteMetadata: {
    title: `Scarlet Studio Urody`,
    description: `Kosmetologia, zabiegi pielęgnacyjne, stylizacja rzęs i brwi oraz bezigłowe wypełnianie hialuronem`,
    author: `Kodula - Marta Majerowska`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-fontawesome-css`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Scarlet Studio Urody`,
        short_name: `Scarlet`,
        start_url: `/`,
        background_color: `#fedbd0`,
        theme_color: `#fedbd0`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.API_KEY,
        previewMode: false,
        disableLiveReload: false,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          {
            resolve: `gatsby-remark-images-datocms`,
            options: {
              // You need to specify your project read-only API token here!
              apiToken: process.env.API_KEY,
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/treatments/*`],
      },
    },
  ],
};
