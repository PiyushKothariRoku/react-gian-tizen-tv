import React from "react";
import { Image } from 'react-bootstrap';
import axios from "axios";
import AxiosInstance from "../service/AxiosInstance";
import { useState, useEffect,useRef } from 'react';


const SliderList = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [video, setVideo] = useState(false);
  const [Url, setUrl] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/all-categories');
        setData(response.data.allData);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoader(false);
      }
    };

    fetchData();
  }, []);
  console.log(data);

  return (
    <div>wfwefwef</div>
  )
}

export default SliderList;