import React, { useCallback, useEffect, useState, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { SpatialNavigation } from '../SpatialNavigation';
import ParserMedia from '../service/parser';
import {
  useFocusable,
  init,
  FocusContext,
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails
} from '../index';
import ContentRow from './ContentRow';
const logo = require('../assets/logo.png').default;
import { useMyContext } from '../hooks/MyContext';
import { convertSecondsToMinAndSec } from '../utils/utils';
import Popup from './Popup'
import MainPlayer from './VideoPlayer';

const NmLogo = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 50%;
  padding: 1rem;
  // margin-bottom: 51px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.div`
  color: white;
  font-size: 48px;
  font-weight: 600;
  font-family: 'Segoe UI';
  text-align: left;
  // margin-top: 52px;
  // margin-bottom: 37px;
`;

const SelectedItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-bottom: -25px;
`;

const SelectedItemBox = styled.div`
  height: 400px;
  width: 50%;
  background-color: ${({ color }) => '#000000'};
  margin-bottom: 37px;
  // border-radius: 7px;
  border: none;
`;
const TopThumbnail = styled.img`
  height: 100%;
  width: 100%;
  border: none;
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  //height: 100%;
  background: radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);
`;

const TopContentDetailBox = styled.div`
  position: absolute;
  display: inline-block;
  width: 50%;
  height:100%;
  top: 0;
  left: 0;
  color: white;
  font-size: 28px;
  font-weight: 400;
  font-family: 'Segoe UI';
  padding: 15px 0 0 15px;
`;

const TopContentDetailTitle = styled.div`
  position: relative;
  width: 100vw;
  font-weight: 700;
`;

const TopContentDetailDesc = styled.div`
  position: relative;
  width: 100%;
  font-size: 22px;
  font-weight: 400;
  margin: 10px 0;
`;


const ScrollingRows = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 1;
  flex-grow: 1;
`;

interface AssetProps {
  title: string;
  source: string;
  url: string,
  onEnterPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

interface ValueProps {
  title: string;
  source: string;
  url: string,
  videoDesc: object,
}

function Content() {
  const { ref, focusKey, focusSelf } = useFocusable();
  const [focusedAsset, setFocusedAsset] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState("");
  const { value, setValue } = useMyContext();
  const [showPlayer, setShowPlayer] = useState(false);
  const [url, setUrl] = useState('');
  const onAssetPress = useCallback((item: AssetProps) => {
    console.log("content page", item);
    setShowPlayer(true);
    setUrl(item.url);
  }, []);

  console.log("value====>", value);
  // const handleChange = (event) => {
  //   // Step 5: Update the context value from the child component
  //   setValue(event.target.value);
  // };
  const openPlayer = () => {
    setShowPlayer(true);
  };

  const closePlayer = () => {
    setShowPlayer(false);
  };

  useEffect(() => {
    setTimeout(() => {
      focusSelf();
    }, 4000);
  }, [focusSelf]);

  const onRowFocus = useCallback(
    ({ y }: { y: number }, title: string) => {
      ref.current.scrollTo({
        top: y,
        behavior: 'smooth'
      });
      // console.log(title);
      // setFocusedAsset("hello");
    },
    [ref]
  );

  const onPlayerFocus = useCallback((container: any) => {
    console.log("player focus", container);
  }, [ref]);

  const onPlayerPress = useCallback((container: any) => {
    console.log("player enter", container);
  }, []);


  const data = ParserMedia();

  // console.log(data);

  return (
    <FocusContext.Provider value={focusKey}>
      <ContentWrapper>
        <SelectedItemWrapper>
          <TopContentDetailBox>
            <TopContentDetailTitle>
              {value ? value.title : ''}
            </TopContentDetailTitle>
            <TopContentDetailDesc>
              {value.videoDesc ? value.videoDesc.shortDescription : ''}
            </TopContentDetailDesc>
            <TopContentDetailDesc>
              {value.videoDesc ? (value.videoDesc.genres ? `${value.videoDesc.genres.join(', ')} | ` : '') : ''}
              {value.videoDesc ? (value.videoDesc.releaseDate ? `${new Date(value.videoDesc.releaseDate).getFullYear()} |` : '') : ''}
              {value.videoDesc ? (value.videoDesc.genres ? convertSecondsToMinAndSec(value.videoDesc.content.duration) : '') : ''}
            </TopContentDetailDesc>
          </TopContentDetailBox>
          <SelectedItemBox
            color={selectedAsset ? selectedAsset.color : '#565b6b'}
          >
            <TopThumbnail crossOrigin="anonymous" src={value.source} alt={value ? value.title : ''} />
            <ThumbnailOverlay />
          </SelectedItemBox>
        </SelectedItemWrapper>
        <ScrollingRows ref={ref}>
          <ScrollingRows ref={ref}>
            {data.map((items: any) => (
              <ContentRow
                key={items.title}
                data={items.videos}
                title={items.title}
                onAssetPress={onAssetPress}
                onFocus={onRowFocus}
              />
            ))}
          </ScrollingRows>
        </ScrollingRows>
        {showPlayer && <MainPlayer url={url}/>}
      </ContentWrapper>
    </FocusContext.Provider>
  );
}

export default Content;
