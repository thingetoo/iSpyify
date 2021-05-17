import React from 'react';

const Answers = (props) => {

  return(
    <div className='answers-container'>
    {
      props.songs && props.songs.map(song => {
        return <span className='answer' style={{color: 'white'}}>{song.album.name}</span>
      })
    }
    </div>
  )
}

export default Answers;