import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const DEFAULT_IMAGE = "https://thoughts.dillionmegida.com/images/cover.png"

const Seo = ({
  description,
  title,
  children,
  imageCard: _imageCard,
  defaultTileOnly,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  const titleToShow = defaultTitle
    ? defaultTileOnly
      ? defaultTitle
      : `${title} | ${defaultTitle}`
    : title

  const imageCard = _imageCard
    ? _imageCard.startsWith("http")
      ? _imageCard
      : `https://thoughts.dillionmegida.com${_imageCard}`
    : DEFAULT_IMAGE

  return (
    <>
      <title>{titleToShow}</title>
      <meta name="description" content={metaDescription} />

      <meta property="og:title" content={titleToShow} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={imageCard} />

      <meta
        name="twitter:creator"
        content={site.siteMetadata?.social?.twitter || ``}
      />
      <meta name="twitter:title" content={titleToShow} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@iamdillion" />
      <meta name="twitter:image" content={imageCard} />
      <meta name="twitter:creator" content="iamdillion" />
      <meta name="referrer" content="origin-when-crossorigin" />
    </>
  )
}

export default Seo
