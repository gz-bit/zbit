import { GetStaticProps } from 'next';
import './index.module.css';

/* eslint-disable-next-line */
export interface AboutProps {
  name: string
}

export function About(props: AboutProps) {
  return (
    <div>
      <h1>Welcome {props.name}!</h1>
    </div>
  );
}
/*
  - getStaticProps
    * e.g. data available at build time
  - getStaticPaths  
    * for dynamic routes
    * list of paths that have to be rendered at build time
    {
      paths: [
        { params: { ... } }
      ],
      fallback: true, false or 'blocking'
*/

export const getStaticProps: GetStaticProps<AboutProps> = async (context) => {
  const name = 'Guenther'
  console.log({context})
  return {
    props: { name }
  }
} 

export default About;
