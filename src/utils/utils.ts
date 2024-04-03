import React from 'react';

export const convertSecondsToMinAndSec = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return ` ${minutes}mins ${seconds}sec`;
  };
