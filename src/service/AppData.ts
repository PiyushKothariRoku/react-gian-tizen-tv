import React from 'react'
import AxiosInstance from './AxiosInstance';
import axios from 'axios';

const data = [];

const AppData = async() => {
  try {
     await AxiosInstance.get('/all-categories')
     .then((res)=>{
      console.log("App Data=> ", res.data);

     })
     .catch((error)=>{
      console.log(error);
     })
    // const data = response.data.allData;
  } catch (error) {

  }

  return data;
}

export default AppData