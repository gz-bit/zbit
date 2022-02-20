import { readdirSync } from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import { join } from "path";
import { ParsedUrlQuery } from "querystring";

import { getParsedFileContentBySlug, renderMarkdown } from '@zbit/md'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import moment from 'moment'

import dynamic from 'next/dynamic'
// import { Youtube } from '@zbit/react/mdx-elements'
import { CustomLink } from "@zbit/mdx-elements";


export interface ArticleProps extends ParsedUrlQuery {
  slug: string
}

const mdxElements = {
  Youtube: dynamic(async () => await import('@zbit/react/mdx-elements/youtube/youtube')),
  a: CustomLink,
}

export function Article({frontmatter, html}) {
  const date = moment(frontmatter.date).format('YYYY-MM-DD HH:m')
  return (
    <div className="dark">
      <h1>Dynamic Routing and Static Generation</h1>

      <article>
        <h2>{frontmatter.title}</h2>
        <h3>by {frontmatter.author.name} </h3>
        <h4>{date}</h4>
        <div>
          <strong><i>{frontmatter.excerpt}</i></strong>
        </div>
      </article>
      <hr />
      <MDXRemote {...html} components={mdxElements} />

    </div>
  );
}

const POSTS_PATH = join(process.cwd(), process.env.articleMarkdownPath)

export interface MdProps {
  frontmatter: Record<string, unknown>,
  html: MDXRemoteSerializeResult<Record<string, unknown>>
}

export const getStaticProps: GetStaticProps<MdProps> = async (
  { params }: { params: ArticleProps }
) => {

  // 1. parse the content of the markdown and separate it into frontmatter and content
  const mdContent = getParsedFileContentBySlug(POSTS_PATH, params.slug)

  // 2. convert markdown content to HTML
  const renderedHtml = await renderMarkdown(mdContent.content)

  return {
    props: { 
      frontmatter: mdContent.frontmatter,
      html: renderedHtml 
    }
  }
} 

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {

  const paths = readdirSync(POSTS_PATH)
                  .map(path => path.replace(/\.mdx?$/, ''))  // strip file extension
                  .map(slug => ({ params: { slug }}))
  return {
    paths,
    fallback: false,
  }
}




export default Article

