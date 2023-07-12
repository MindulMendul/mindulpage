"use client"

import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

type YoutubeProps = {
  videoId:string
};

const Youtube = (props: YoutubeProps) => {
  const { videoId } = props;

  const [Video, setVideo] = useState<JSX.Element|null>(null);

  useEffect(()=>{
    if(typeof window){
      setVideo((
        <ReactPlayer
          className='react-player absolute'
          url={`https://www.youtube.com/watch?v=${videoId}`}
          width='100%'
          height='100%'
        />
      ))
    }
  },[]);

  return (
    <div className='player-wrapper relative xl:w-3/4 lg:w-[600px] sm:w-[480px] xs:w-100'>
      {Video}
    </div>
  )
};

export default Youtube;
