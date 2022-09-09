import React from 'react'
import Ripple from '../Assets/imgs/Ripple.svg'

const LoadingOverlay = () => {
  return (
    <div className='loadingOverlay'>
        <img src={Ripple} alt="Loading..." />
    </div>
  )
}

export default LoadingOverlay