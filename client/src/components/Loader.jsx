import React from 'react'
import LoadingGif from '../images/loading.gif'

const Loader = () => {
  return (
    <div className = 'loader'>
        <img src={LoadingGif} alt="Loading..." className='loader_image' />
    </div>
  )
}   

export default Loader
