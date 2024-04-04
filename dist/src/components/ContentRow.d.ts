import React from 'react';
import { FocusDetails, FocusableComponentLayout, KeyPressDetails } from '../index';
interface ContentRowProps {
    data: any[];
    title: string;
    onAssetPress: (props: object, details: KeyPressDetails) => void;
    onFocus: (layout: FocusableComponentLayout, props: object, details: FocusDetails) => void;
}
declare const ContentRow: ({ data, title: rowTitle, onAssetPress, onFocus }: ContentRowProps) => React.JSX.Element;
export default ContentRow;
