import React, { useEffect, useCallback, useState, useRef } from 'react'
import styled from 'styled-components';
import { Asset } from "./Assest";
import {
  useFocusable,
  FocusContext,
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails
} from '../index';
import { useMyContext } from '../hooks/MyContext';

const ContentRowWrapper = styled.div`
  margin-bottom: 37px;
`;

const ContentRowTitle = styled.div`
  color: white;
  margin-bottom: 22px;
  font-size: 27px;
  font-weight: 700;
  font-family: 'Segoe UI';
  padding-left: 15px;
`;

const ContentRowScrollingWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  flex-shrink: 1;
  flex-grow: 1;
  padding-left: 15px;
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


const ContentRow = ({
  data,
  title: rowTitle,
  onAssetPress,
  onFocus
}: ContentRowProps) => {

  const { ref, focusKey } = useFocusable({
    onFocus
  });
  const scrollingRef = useRef(null);
  const [focusedItemTitle, setFocusedItemTitle] = useState("");
  const { value, setValue } = useMyContext();


  const onAssetFocus = useCallback(
    ({ x }: { x: number }, detail: any) => {
      scrollingRef.current.scrollTo({
        left: x,
        behavior: 'smooth'
      });
      // console.log(detail);
      setFocusedItemTitle(detail.title);
      setValue(detail);
    },
    [scrollingRef]
  );

  // console.log("datadtaattatatat=>: ",data)
  // useEffect(() => {
  //   // Reset focused item title when data or streamData changes
  //   setFocusedItemTitle("");
  // }, [data]);

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
                videoDesc={item.videoDesc}
                onEnterPress={onAssetPress}
                onFocus={onAssetFocus}
              />
            )}
          </ContentRowScrollingContent>
        </ContentRowScrollingWrapper>
      </ContentRowWrapper>
    </FocusContext.Provider>
  );
}


export default ContentRow