import './youtube.module.css';

/* eslint-disable-next-line */
export interface YoutubeProps {
  title: string
  uid: string
}

export function Youtube(props: YoutubeProps) {
  return (
    <div>
      <iframe
        src={`https://youtube.com/embed/${props.uid}`}
        width="96%"
        style={{padding: "2%", border: "none"}}
        height="500px"
        title={props.title}
      ></iframe>
    </div>
  );
}

export default Youtube;
