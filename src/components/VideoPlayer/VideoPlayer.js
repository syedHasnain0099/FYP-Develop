import React from 'react'
import ReactPlayer from 'react-player'
import { useLocation } from 'react-router-dom'
import './VideoPalyer.css'
function VideoPlayer(props) {
  let location = useLocation()
  console.log('about', props.state)
  return (
    <div className='App'>
      <ReactPlayer
        url='https://www.youtube.com/watch?v=Msl2fl3h59I'
        controls
        onReady={() => console.log('onReady callback')}
        onStart={() => console.log('onStart callback')}
        onPause={() => console.log('onPause callback')}
        onEnded={() => console.log('onEnded callback')}
        onError={() => console.log('onError callback')}
      />
    </div>
  )
}

export default VideoPlayer
