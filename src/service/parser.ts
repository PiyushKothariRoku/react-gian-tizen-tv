import  { useState, useEffect } from "react";
import AxiosInstance from "./AxiosInstance";

let mediaData = [];
function ParserMedia() {
  // Define models for MediaItem and Category



  const [categories, setCategories] = useState([]);


  useEffect(() => {


    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/all-categories');
        const data = response.data.allData;
        const parsedCategories = data.map(category => {
          if (category.category.categoryType.toLowerCase() !== 'vod') {
            const customArray = category.streams.map(element => {
              // Return a modified value or object for each element
              return {
                id: element.id,
                title: element.title,
                thumbnail: element.image,
                videoUrl: element.url,
              };
            });
            return { id: category.category.id, title: category.category.categoryName, videos:customArray, dataUrl: ""};
          } else {

            return { id: category.category.id, title: category.category.categoryName, videos: [], dataUrl: category.streams[0].url};
          }
        });





        setCategories(parsedCategories);

        parsedCategories.forEach(category => {
          if (category.dataUrl != null) {
            const url = category.dataUrl;
            fetchVODItems(category.id, url, parsedCategories);
          }

        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }



    };

    const fetchVODItems = async (id, url, parsedCategories) => {
      try {
        const response = await fetch(url);
        const data = await response.json();


        const filteredCategory = parsedCategories.filter(category => category.id === id);


        if (data.movies != null) {
          const moviesVideos = data.movies.map(movie =>{ return { id: movie.id, title: movie.title, thumbnail: movie.thumbnail, videoUrl:movie.content.videos[0].url}});
          filteredCategory[0].videos = moviesVideos;

        }
        if (data.shortFormVideos != null) {
          const shortFormVideos = data.shortFormVideos.map(shortFormVideos => { return { id: shortFormVideos.id, title: shortFormVideos.title, thumbnail: shortFormVideos.thumbnail, videoUrl:shortFormVideos.content.videos[0].url}});
          filteredCategory[0].videos = shortFormVideos;

        }


        setCategories(parsedCategories);
        mediaData = parsedCategories;






      } catch (error) {
        console.error('Error fetching additional info:', error);
      }

    };

    fetchData();


  }, []);

  return  mediaData;
}



export default ParserMedia;
