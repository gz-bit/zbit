import { join } from 'path'
import { getParsedFileContentBySlug, renderMarkdown } from './md';

const slug = 'test'
const path = join(process.cwd(), 'assets/articleTest')

const mdContent = getParsedFileContentBySlug(path, slug)
//const renderHtml = async () => await renderMarkdown('')

const fm = mdContent.frontmatter
const title = fm['title']
const excerpt = fm['excerpt']
const authorName = fm['author']['name']
const content = mdContent.content 

describe('md', () => {
  it('should find title', () => {
    expect(title).toEqual('title');
  });
  it('should find excerpt', () => {
    expect(excerpt).toEqual('excerpt');
  });
  it('should find authorName', () => {
    expect(authorName).toEqual('Author Name');
  });
  it('should find content', () => {
    expect(content).toEqual('content');
  });
  it('should render content', () => {
    renderMarkdown(content).then( res => { 
      expect(res).toBeDefined()
    })  
  })    
})



