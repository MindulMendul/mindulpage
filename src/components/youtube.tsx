"use client"

import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube"

type YoutubeProps = {
  videoId:string
}

const Youtube = (props: YoutubeProps) => {
  const {videoId} = props;

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  }

  const onPlayerEnd = (e:YouTubeEvent<number>)=>{ e.target.stopVideo(0);}

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} onEnd={onPlayerEnd}/>;
}

export default Youtube;
