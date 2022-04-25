import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { useLocation } from 'react-router-dom'
import './VideoPalyer.css'
import productService from '../../services/ProductService'
function VideoPlayer(props) {
  let mediaType = ''
  let location = useLocation()

  return (
    <>
      {location.state.video.map((item, index) => {
        mediaType = productService.checkMediaType(item)
        if (mediaType == 'video') {
          return (
            <div className='App'>
              <ReactPlayer
                url={item}
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
      })}
    </>
  )
}

export default VideoPlayer
