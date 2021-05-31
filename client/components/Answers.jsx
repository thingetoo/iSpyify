import React from 'react';

const Answers = (props) => {

  return(
    <div className='answers-container'>
    {
      props.songs && props.songs.map((song, idx) => {
        return <span key={song.album.name + idx} className='answer' onClick={e => props.handleClick(song)} style={{color: 'white'}}>{song.album.name}</span>
      })
    }
    </div>
  )
}

export default Answers;