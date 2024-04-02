export type Direction = 'up' | 'down' | 'left' | 'right';
export declare const ROOT_FOCUS_KEY = "SN:ROOT";
export interface FocusableComponentLayout {
    left: number;
    top: number;
    readonly right: number;
    readonly bottom: number;
    width: number;
    height: number;
    x: number;
    y: number;
    node: HTMLElement;
}
export type PressedKeys = {
    [index: string]: number;
};
/**
 * Extra details about pressed keys passed on the key events
 */
export interface KeyPressDetails {
    pressedKeys: PressedKeys;
}
/**
 * Extra details passed from outside to be bounced back on other callbacks
 */
export interface FocusDetails {
    event?: Event;
    nativeEvent?: Event;
    [key: string]: any;
}
export type BackwardsCompatibleKeyMap = {
    [index: string]: string | number | (number | string)[];
};
export type KeyMap = {
    [index: string]: (string | number)[];
};
export declare const init: ({ debug, visualDebug, nativeMode, throttle: throttleParam, throttleKeypresses, useGetBoundingClientRect, shouldFocusDOMNode, shouldUseNativeEvents, rtl }?: {
    debug?: boolean;
    visualDebug?: boolean;
    nativeMode?: boolean;
    throttle?: number;
    throttleKeypresses?: boolean;
    useGetBoundingClientRect?: boolean;
    shouldFocusDOMNode?: boolean;
    shouldUseNativeEvents?: boolean;
    rtl?: boolean;
}) => void, setThrottle: ({ throttle: throttleParam, throttleKeypresses }?: {
    throttle?: number;
    throttleKeypresses?: boolean;
}) => void, destroy: () => void, setKeyMap: (keyMap: BackwardsCompatibleKeyMap) => void, setFocus: (focusKey: string, focusDetails?: FocusDetails) => void, navigateByDirection: (direction: string, focusDetails: FocusDetails) => void, pause: () => void, resume: () => void, updateAllLayouts: () => void, getCurrentFocusKey: () => string, doesFocusableExist: (focusKey: string) => boolean;
