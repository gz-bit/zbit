import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'

export interface TopicButtonProps {
  topicName: string
  heightInPix?: number
  onClick?: (topicName: string) => void
}

export function TopicButton(props: TopicButtonProps) {
  const size = props.heightInPix
    ? props.heightInPix
    : 20
  const height = size + 'px'
  const logoStyle = {paddingRight: height, height: height}
  const fontStyle = {fontSize: height, padding: height}
  const [icon, setIcon] = useState('')
  const iconPresent = ['react', 'nextjs']

  useEffect(() => {
    const fetchIcon = async () => {
      let svgName = props.topicName
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLocaleLowerCase()

      if (!iconPresent.includes(svgName)) {
        svgName = 'code'
      } 
      
      const svgIcon = await import(`./logos/${svgName}.svg`)
      
      setIcon(svgIcon.default)
    }
    fetchIcon()
  }, [])

  const onClickHandler = () => {
    props.onClick
      ? props.onClick(props.topicName)
      : console.warn('No onClick event in TopicButtonProps')
  }
  return (
    <div>
      <Button 
        variant="contained"
        style={fontStyle}
        onClick={onClickHandler}
        data-testid="TopicButton"
      >
        <img 
          src={icon}
          alt="logo"
          style={logoStyle}
        />
        <h2 data-testid="topicName">{props.topicName}</h2>
      </Button>
    </div>
  );
}

export default TopicButton;
