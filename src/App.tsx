/**
 * Since this file is for development purposes only, some of the dependencies are in devDependencies
 * Disabling ESLint rules for these dependencies since we know it is only for development purposes
 */

import React, { useCallback, useEffect, useState, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOMClient from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled, { createGlobalStyle } from 'styled-components';
import {
  useFocusable,
  init,
  FocusContext,
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails
} from './index';

import ParserMedia from './service/parser';
import SplashScreen from './SplashScreen';
let mediaData = [];

const logo = require('./assets/logo.png').default;

init({
  // debug: true,
  visualDebug: false
});

let allData: any = [];
let allstreams: any = [];


const NmLogo = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 50%;
  padding: 1rem;
  // margin-bottom: 51px;
`;

const AssetWrapper = styled.div`
  margin-right: 22px;
  display: flex;
  flex-direction: column;
`;

interface AssetBoxProps {
  focused: boolean;
  source: string;
}

const AssetBox = styled.div<AssetBoxProps>`
  width: 300px;
  height: 190px;

  border-color: red;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? '6px' : 0)};
  box-sizing: border-box;
  border-radius: 7px;
  position: relative;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 290px;
    height: 180px;
  }
`;

const AssetTitle = styled.div`
  color: white;
  margin-top: 10px;
  font-family: 'Segoe UI';
  font-size: 24px;
  font-weight: 400;
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

function Asset({ title, source, onEnterPress, onFocus, url }: AssetProps) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    onFocus
  });

  return (
    <AssetWrapper ref={ref}>
      <AssetBox source={source} focused={focused}>

        <img crossOrigin="anonymous" src={source} />
      </AssetBox>

      <AssetTitle>{title}</AssetTitle>
    </AssetWrapper>
  );
}

const ContentRowWrapper = styled.div`
  margin-bottom: 37px;
`;

const ContentRowTitle = styled.div`
  color: white;
  margin-bottom: 22px;
  font-size: 27px;
  font-weight: 700;
  font-family: 'Segoe UI';
  padding-left: 60px;
`;

const ContentRowScrollingWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  flex-shrink: 1;
  flex-grow: 1;
  padding-left: 60px;
`;

const ContentRowScrollingContent = styled.div`
  display: flex;
  flex-direction: row;
`;

interface ContentRowProps {
  data: any[]
  title: string;
  onAssetPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}


function ContentRow({
  data,
  title: rowTitle,
  onAssetPress,
  onFocus
}: ContentRowProps) {
  const { ref, focusKey } = useFocusable({
    onFocus
  });
  const scrollingRef = useRef(null);
  const [focusedItemTitle, setFocusedItemTitle] = useState("");

  const onAssetFocus = useCallback(
    ({ x }: { x: number }, title: string) => {
      scrollingRef.current.scrollTo({
        left: x,
        behavior: 'smooth'
      });
      setFocusedItemTitle(title);
    },
    [scrollingRef]
  );

  useEffect(() => {
    // Reset focused item title when data or streamData changes
    setFocusedItemTitle("");
  }, [data]);


  return (
    <FocusContext.Provider value={focusKey}>
      <ContentRowWrapper ref={ref}>
        <ContentRowTitle>{rowTitle}</ContentRowTitle>
        <ContentRowScrollingWrapper ref={scrollingRef}>
          <ContentRowScrollingContent>
            {data.map((item: any) =>
              <Asset
                key={item.title}
                title={item.title}
                url={item.videoUrl}
                source={item.thumbnail}
                onEnterPress={onAssetPress}
                onFocus={onAssetFocus}
              />
            )}
          </ContentRowScrollingContent>
          {focusedItemTitle && <div style={{ color: "red" }}>{focusedItemTitle}</div>}
        </ContentRowScrollingWrapper>
      </ContentRowWrapper>
    </FocusContext.Provider>
  );
}

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
  background-color: ${({ color }) => color};
  margin-bottom: 37px;
  // border-radius: 7px;
`;

const SelectedItemTitle = styled.div`
  position: absolute;
  top: 75px;
  left: 100px;
  color: white;
  font-size: 27px;
  font-weight: 400;
  font-family: 'Segoe UI';
`;

const ScrollingRows = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 1;
  flex-grow: 1;
`;

function Content() {
  const { ref, focusKey, focusSelf } = useFocusable();

  const [selectedAsset, setSelectedAsset] = useState(null);
  const onAssetPress = useCallback((asset: AssetProps) => {
  }, []);

  useEffect(() => {
    setTimeout(() => {
      focusSelf();
    }, 6000);
  }, [focusSelf]);

  const onRowFocus = useCallback(
    ({ y }: { y: number }) => {
      ref.current.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    },
    [ref]
  );


  const data = ParserMedia();

  return (
    <FocusContext.Provider value={focusKey}>
      <ContentWrapper>
        <ContentTitle>
          <NmLogo src={logo} alt="GianTV" />
        </ContentTitle>
        <SelectedItemWrapper>
          <SelectedItemBox
            color={selectedAsset ? selectedAsset.color : '#565b6b'}
          />
          <SelectedItemTitle>
            {selectedAsset
              ? selectedAsset.title
              : ''}
          </SelectedItemTitle>
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

      </ContentWrapper>
    </FocusContext.Provider>
  );
}

const AppContainer = styled.div`
  background-color: #221c35;
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: row;
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

function App() {
  const [view, setView] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setView(true);
    }, 5000);
  }, []);

  return (
    <React.StrictMode>
      <AppContainer>
        <GlobalStyle />
        {
          view ? <Content mediaData={mediaData} /> : <SplashScreen />
        }
      </AppContainer>
    </React.StrictMode>
  );
}

const root = ReactDOMClient.createRoot(document.querySelector('#root'));
root.render(<App />);
