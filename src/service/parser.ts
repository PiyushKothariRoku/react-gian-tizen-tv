import React, { useState, useEffect } from "react";
import AxiosInstance from "./AxiosInstance";

let mediaData = [];
function ParserMedia() {
  // Define models for MediaItem and Category
  class MediaItem {
    constructor(id, title, thumbnail, videoUrl) {
      this.id = id;
      this.title = title;
      this.thumbnail = thumbnail;
      this.videoUrl = videoUrl;
    }
  }

  class Category {
    constructor(id, name, videos, dataUrl) {
      this.id = id;
      this.name = name;
      this.videos = videos;
      this.dataUrl = dataUrl;
    }
  }

  // State variables
  const [categories, setCategories] = useState([]);


  useEffect(() => {


    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/all-categories');
        const data = response.data.allData;

        console.log("response data=>>>>", data);
        const parsedCategories = data.map(category => {
          if (category.category.categoryType.toLowerCase() !== 'vod') {
            const liveItems = category.streams.map((video:any) => [video.id, video.title, video.image, video.url]);
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
            // return [category.category.id, category.category.categoryName, [], category.streams[0].url];
            return { id: category.category.id, title: category.category.categoryName, videos: [], dataUrl: category.streams[0].url};
          }
        });
        console.log("parsedCategories=====> ",parsedCategories);
        // Parse and save data using models
      //  const parsedCategories = data.map(category => {
      //     if (category.category.categoryType.toLowerCase() !== 'vod') {
      //       const videos = category.streams.map(video => new MediaItem(video.id, video.title, video.image, video.url));
      //       return new Category(category.category.id, category.category.categoryName, videos, "");
      //     } else {
      //       return new Category(category.category.id, category.category.categoryName, [], category.streams[0].url);
      //     }
      //   });



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

        console.log('mediaData ', mediaData);




      } catch (error) {
        console.error('Error fetching additional info:', error);
      }

    };

    fetchData();


  }, []);

  return  mediaData;
}


// console.log("ijheifwhef",mediaData);
// export {mediaData};
export default ParserMedia;
