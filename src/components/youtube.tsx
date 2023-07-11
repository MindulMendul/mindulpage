"use client"

import ReactPlayer from 'react-player/youtube'

type YoutubeProps = {
  videoId:string
}

const Youtube = (props: YoutubeProps) => {
  const { videoId } = props;

  return (
    <div className='player-wrapper relative xl:w-3/4 lg:w-[600px] sm:w-[480px] xs:w-100'>
      {window?
      <ReactPlayer
        className='react-player absolute'
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width='100%'
        height='100%'
      />
      :undefined}
    </div>
  )
}

export default Youtube;
