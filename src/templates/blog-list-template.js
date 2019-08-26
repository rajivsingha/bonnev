import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import "../scss/main.scss"
import styles from "../scss/blog.module.scss"

export default class BlogList extends React.Component {
    render() {
        const posts = this.props.data.allMarkdownRemark.edges

        const { currentPage, numPages } = this.props.pageContext
        const isFirst = currentPage === 1
        const isLast = currentPage === numPages
        const prevPage = currentPage - 1 === 1 ? "/blog/" : (currentPage - 1).toString()
        const nextPage = "blog/" + (currentPage + 1).toString()

        return (
            <Layout>
                <h1>Latest News &amp; Posts</h1>
                {posts.map(({ node }) => {
                    const title = node.frontmatter.title || node.frontmatter.path
                    return <article className={styles.item}>
                        <div className={styles.title}>
                            <h2>
                                <Link to={node.frontmatter.path}>{title}</Link>
                            </h2>
                        </div>
                        <div className={styles.content}>
                            <p>{node.excerpt}</p>
                            <div className={styles.meta}>
                                <Link to={node.frontmatter.path}><button className="btn">Read Article</button></Link>
                                <h4>{node.frontmatter.date}</h4>
                            </div>
                        </div>
                    </article>
                })}

                {!isFirst && (
                    <Link to={prevPage} rel="prev">
                        Previous Page
                    </Link>
                )}
                {!isLast && (
                    <Link to={nextPage} rel="next">
                        Next Page
                    </Link>
                )}
            </Layout>
        )
    }
}
export const blogListQuery = graphql`
    query blogListQuery($skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "MMMM DD, YY")
                        path
                    }
                    excerpt
                }
            }
        }
    }
`