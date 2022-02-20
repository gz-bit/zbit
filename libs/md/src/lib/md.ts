import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

export interface Frontmatter {
  //data: {
    title: string
    excerpt: string
    date: Date
    author: { name: string }
  //}
}
  

export const getParsedFileContentBySlug = (path: string, slug: string) => {

  const file = join(path, `${slug}.mdx`)

  const fileContent = readFileSync(file)
  const { data, content } = matter(fileContent)

  const frontmatter = data 

  //console.log({frontmatter})
  
  return {
    frontmatter,
    content
  }
}


export const renderMarkdown = (content: string) => {
  return serialize(content || '')
}

