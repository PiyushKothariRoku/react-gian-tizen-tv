import { RefObject } from 'react';
import { FocusableComponentLayout, FocusDetails, KeyPressDetails, Direction } from './SpatialNavigation';
export type EnterPressHandler<P = object> = (props: P, details: KeyPressDetails) => void;
export type EnterReleaseHandler<P = object> = (props: P) => void;
export type ArrowPressHandler<P = object> = (direction: string, props: P, details: KeyPressDetails) => boolean;
export type FocusHandler<P = object> = (layout: FocusableComponentLayout, props: P, details: FocusDetails) => void;
export type BlurHandler<P = object> = (layout: FocusableComponentLayout, props: P, details: FocusDetails) => void;
export interface UseFocusableConfig<P = object> {
    focusable?: boolean;
    saveLastFocusedChild?: boolean;
    trackChildren?: boolean;
    autoRestoreFocus?: boolean;
    forceFocus?: boolean;
    isFocusBoundary?: boolean;
    focusBoundaryDirections?: Direction[];
    focusKey?: string;
    preferredChildFocusKey?: string;
    onEnterPress?: EnterPressHandler<P>;
    onEnterRelease?: EnterReleaseHandler<P>;
    onArrowPress?: ArrowPressHandler<P>;
    onFocus?: FocusHandler<P>;
    onBlur?: BlurHandler<P>;
    extraProps?: P;
}
export interface UseFocusableResult {
    ref: RefObject<any>;
    focusSelf: (focusDetails?: FocusDetails) => void;
    focused: boolean;
    hasFocusedChild: boolean;
    focusKey: string;
}
export declare const useFocusable: <P>({ focusable, saveLastFocusedChild, trackChildren, autoRestoreFocus, forceFocus, isFocusBoundary, focusBoundaryDirections, focusKey: propFocusKey, preferredChildFocusKey, onEnterPress, onEnterRelease, onArrowPress, onFocus, onBlur, extraProps }?: UseFocusableConfig<P>) => UseFocusableResult;
