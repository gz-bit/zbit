import './index.module.css';
import { useState  } from 'react';
import ArticleCard  from '../../components/ArticleCard'
import { TopicButton } from '@zbit/shared/ui'

/* eslint-disable-next-line */
export interface TopicsProps {}

export function Topics(props: TopicsProps) {
 
  const [topic, setTopic] = useState('')

  const topicButtonClicked = (returnedTopic: string) => {
    setTopic(returnedTopic)
  }

  return (
    <div>
      <h1>Welcome to Topics!</h1>
      <ArticleCard />
      <TopicButton topicName={topic ? topic : 'nx'} heightInPix={30} onClick={topicButtonClicked}/>
      {topic ? <p>TopicButton cliked: <b test-id="topic">{topic}</b></p> : ''}
    </div>
  );
}

export default Topics;
