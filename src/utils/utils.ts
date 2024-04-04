import React from 'react';

export const convertSecondsToMinAndSec = (totalSeconds: any) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return ` ${minutes}mins ${seconds}sec`;
  };

  export const  hasCustomProperty = (obj: any, key:any) => {
    if(typeof obj === 'object' && key in obj) return `${obj[key]} |`;
    else return '';
  }

  export const  getYearFromStringFormat = (obj: any, key:any) => {
    if(typeof obj === 'object' && "videoDesc" in obj && key in obj.videoDesc) return ` ${new Date(obj.videoDesc[key]).getFullYear()} |`;
    else return '';
  }