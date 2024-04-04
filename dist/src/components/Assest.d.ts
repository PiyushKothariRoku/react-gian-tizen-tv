import React from "react";
import { FocusDetails, FocusableComponentLayout, KeyPressDetails } from '../index';
interface AssetProps {
    title: string;
    source: string;
    url: string;
    videoDesc: any;
    onEnterPress: (props: object, details: KeyPressDetails) => void;
    onFocus: (layout: FocusableComponentLayout, props: object, details: FocusDetails) => void;
}
export declare function Asset({ title, source, url, videoDesc, onEnterPress, onFocus }: AssetProps): React.JSX.Element;
export {};
