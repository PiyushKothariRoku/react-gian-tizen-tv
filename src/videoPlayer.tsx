import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import React, { useEffect, useRef } from 'react';

export const MainPlayer = ({url}) => {
  console.log("this are the props",url)
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
    src: url,
    type: 'application/x-mpegURL'
    }]
  };


  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
    videojs.log('player is waiting');
    });

    player.on('playing', () => {
    videojs.log('player is playing');
    });

    player.on('dispose', () => {
    videojs.log('player will dispose');
    });

    player.on('error', (e) => {
    videojs.log('player error', e);
    });
  };

  useEffect(() => {

        if (!playerRef.current) {
        console.log("111111111");

        const videoElement = document.createElement("video-js");

        videoElement.classList.add('vjs-big-play-centered');
       ;
        videoRef.current.appendChild(videoElement);

        const player = playerRef.current = videojs(videoElement, videoJsOptions, () => {
        videojs.log('player is ready');
        console.log(this);
        handlePlayerReady && handlePlayerReady(player);
        });


        } else {
        console.log("2222222222");
        const player = playerRef.current;
        player.autoplay(videoJsOptions.autoplay);
        player.src(videoJsOptions.sources);
        }
    }, [videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
            player.dispose();
            playerRef.current = null;
            }
        };
    }, [playerRef]);
  return (
    <div className='player-container'>
        <div className='video-js-player' vjs-fluid="true" data-vjs-player="true">
        <div ref={videoRef}></div>
        </div>
    </div>
  );
};

export default MainPlayer;
