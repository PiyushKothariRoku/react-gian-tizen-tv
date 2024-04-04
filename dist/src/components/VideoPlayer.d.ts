import 'video.js/dist/video-js.css';
import React from 'react';
interface PlayerContainerProps {
    url: string;
}
declare const MainPlayer: ({ url, }: PlayerContainerProps) => React.JSX.Element;
export default MainPlayer;
