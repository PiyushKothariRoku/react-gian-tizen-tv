import React, { useCallback, useEffect, useState, useRef } from "react";
import styled, { createGlobalStyle } from 'styled-components';

import { SpatialNavigation } from "../SpatialNavigation";

import {
  useFocusable,
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails
} from '../index';

interface AssetBoxProps {
  focused: boolean;
  source: string;
}

const AssetWrapper = styled.div`
  margin-right: 22px;
  display: flex;
  flex-direction: column;
`;
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
  videoDesc: any,
  onEnterPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

export function Asset({ title, source, url, videoDesc, onEnterPress, onFocus }: AssetProps) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    onFocus,
    extraProps: {
      title,
      source,
      url,
      videoDesc,
    }
  });

  return (
    <AssetWrapper ref={ref}>
      <AssetBox source={source} focused={focused}>
        <img crossOrigin="anonymous" src={source} />
      </AssetBox>

      {/* <AssetTitle>{title}</AssetTitle> */}
    </AssetWrapper>
  );
}