import css from './custom-link.module.css' 

import Link from 'next/link'

/* eslint-disable-next-line */
export interface CustomLinkProps {
  as: string
  href: string
}

export function CustomLink({ as, href, ...otherProps}: CustomLinkProps) {
 
  return (
    <Link as={as} href={href}>
      <a className={css.link} { ...otherProps }></a>  
    </Link>
  );
}

export default CustomLink;
