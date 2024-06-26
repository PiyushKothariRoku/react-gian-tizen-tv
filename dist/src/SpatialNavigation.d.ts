import WritingDirection from './WritingDirection';
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
interface FocusableComponent {
    focusKey: string;
    node: HTMLElement;
    parentFocusKey: string;
    onEnterPress: (details?: KeyPressDetails) => void;
    onEnterRelease: () => void;
    onArrowPress: (direction: string, details: KeyPressDetails) => boolean;
    onFocus: (layout: FocusableComponentLayout, details: FocusDetails) => void;
    onBlur: (layout: FocusableComponentLayout, details: FocusDetails) => void;
    onUpdateFocus: (focused: boolean) => void;
    onUpdateHasFocusedChild: (hasFocusedChild: boolean) => void;
    saveLastFocusedChild: boolean;
    trackChildren: boolean;
    preferredChildFocusKey?: string;
    focusable: boolean;
    isFocusBoundary: boolean;
    focusBoundaryDirections?: Direction[];
    autoRestoreFocus: boolean;
    forceFocus: boolean;
    lastFocusedChildKey?: string;
    layout?: FocusableComponentLayout;
    layoutUpdated?: boolean;
}
interface FocusableComponentUpdatePayload {
    node: HTMLElement;
    preferredChildFocusKey?: string;
    focusable: boolean;
    isFocusBoundary: boolean;
    focusBoundaryDirections?: Direction[];
    onEnterPress: (details?: KeyPressDetails) => void;
    onEnterRelease: () => void;
    onArrowPress: (direction: string, details: KeyPressDetails) => boolean;
    onFocus: (layout: FocusableComponentLayout, details: FocusDetails) => void;
    onBlur: (layout: FocusableComponentLayout, details: FocusDetails) => void;
}
interface FocusableComponentRemovePayload {
    focusKey: string;
}
interface CornerCoordinates {
    x: number;
    y: number;
}
interface Corners {
    a: CornerCoordinates;
    b: CornerCoordinates;
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
declare class SpatialNavigationService {
    private focusableComponents;
    private visualDebugger;
    /**
     * Focus key of the currently focused element
     */
    private focusKey;
    private shouldFocusDOMNode;
    private shouldUseNativeEvents;
    /**
     * This collection contains focus keys of the elements that are having a child focused
     * Might be handy for styling of certain parent components if their child is focused.
     */
    private parentsHavingFocusedChild;
    private enabled;
    /**
     * Used in the React Native environment
     * In this mode, the library works as a "read-only" helper to sync focused
     * states for the components when they are focused by the native focus engine
     */
    private nativeMode;
    /**
     * Throttling delay for key presses in milliseconds
     */
    private throttle;
    /**
     * Enables/disables throttling feature
     */
    private throttleKeypresses;
    /**
     * Storing pressed keys counter by the eventType
     */
    private pressedKeys;
    /**
     * Flag used to block key events from this service
     */
    private paused;
    /**
     * Enables/disables getBoundingClientRect
     */
    private useGetBoundingClientRect;
    private keyDownEventListener;
    private keyDownEventListenerThrottled;
    private keyUpEventListener;
    private keyMap;
    private debug;
    private logIndex;
    private setFocusDebounced;
    private writingDirection;
    /**
     * Used to determine the coordinate that will be used to filter items that are over the "edge"
     */
    static getCutoffCoordinate(isVertical: boolean, isIncremental: boolean, isSibling: boolean, layout: FocusableComponentLayout, writingDirection: WritingDirection): number;
    /**
     * Returns two corners (a and b) coordinates that are used as a reference points
     * Where "a" is always leftmost and topmost corner, and "b" is rightmost bottommost corner
     */
    static getRefCorners(direction: string, isSibling: boolean, layout: FocusableComponentLayout): {
        a: {
            x: number;
            y: number;
        };
        b: {
            x: number;
            y: number;
        };
    };
    /**
     * Calculates if the sibling node is intersecting enough with the ref node by the secondary coordinate
     */
    static isAdjacentSlice(refCorners: Corners, siblingCorners: Corners, isVerticalDirection: boolean): boolean;
    static getPrimaryAxisDistance(refCorners: Corners, siblingCorners: Corners, isVerticalDirection: boolean): number;
    static getSecondaryAxisDistance(refCorners: Corners, siblingCorners: Corners, isVerticalDirection: boolean): number;
    /**
     * Inspired by: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS_for_TV/TV_remote_control_navigation#Algorithm_design
     * Ref Corners are the 2 corners of the current component in the direction of navigation
     * They are used as a base to measure adjacent slices
     */
    sortSiblingsByPriority(siblings: FocusableComponent[], currentLayout: FocusableComponentLayout, direction: string, focusKey: string): FocusableComponent[];
    constructor();
    init({ debug, visualDebug, nativeMode, throttle: throttleParam, throttleKeypresses, useGetBoundingClientRect, shouldFocusDOMNode, shouldUseNativeEvents, rtl }?: {
        debug?: boolean;
        visualDebug?: boolean;
        nativeMode?: boolean;
        throttle?: number;
        throttleKeypresses?: boolean;
        useGetBoundingClientRect?: boolean;
        shouldFocusDOMNode?: boolean;
        shouldUseNativeEvents?: boolean;
        rtl?: boolean;
    }): void;
    setThrottle({ throttle: throttleParam, throttleKeypresses }?: {
        throttle?: number;
        throttleKeypresses?: boolean;
    }): void;
    destroy(): void;
    getEventType(keyCode: number | string): string;
    static getKeyCode(event: KeyboardEvent): string | number;
    bindEventHandlers(): void;
    unbindEventHandlers(): void;
    onEnterPress(keysDetails: KeyPressDetails): void;
    onEnterRelease(): void;
    onArrowPress(direction: string, keysDetails: KeyPressDetails): boolean;
    /**
     * Move focus by direction, if you can't use buttons or focusing by key.
     *
     * @example
     * navigateByDirection('right') // The focus is moved to right
     */
    navigateByDirection(direction: string, focusDetails: FocusDetails): void;
    /**
     * This function navigates between siblings OR goes up by the Tree
     * Based on the Direction
     */
    smartNavigate(direction: string, fromParentFocusKey: string, focusDetails: FocusDetails): void;
    saveLastFocusedChildKey(component: FocusableComponent, focusKey: string): void;
    log(functionName: string, debugString: string, ...rest: any[]): void;
    /**
     * Returns the current focus key
     */
    getCurrentFocusKey(): string;
    /**
     * Returns the focus key to which focus can be forced if there are force-focusable components.
     * A component closest to the top left viewport corner (0,0) is returned.
     */
    getForcedFocusKey(): string | undefined;
    /**
     * This function tries to determine the next component to Focus
     * It's either the target node OR the one down by the Tree if node has children components
     * Based on "targetFocusKey" which means the "intended component to focus"
     */
    getNextFocusKey(targetFocusKey: string): string;
    addFocusable({ focusKey, node, parentFocusKey, onEnterPress, onEnterRelease, onArrowPress, onFocus, onBlur, saveLastFocusedChild, trackChildren, onUpdateFocus, onUpdateHasFocusedChild, preferredChildFocusKey, autoRestoreFocus, forceFocus, focusable, isFocusBoundary, focusBoundaryDirections }: FocusableComponent): void;
    removeFocusable({ focusKey }: FocusableComponentRemovePayload): void;
    getNodeLayoutByFocusKey(focusKey: string): FocusableComponentLayout;
    setCurrentFocusedKey(newFocusKey: string, focusDetails: FocusDetails): void;
    updateParentsHasFocusedChild(focusKey: string, focusDetails: FocusDetails): void;
    updateParentsLastFocusedChild(focusKey: string): void;
    getKeyMap(): KeyMap;
    setKeyMap(keyMap: BackwardsCompatibleKeyMap): void;
    isFocusableComponent(focusKey: string): boolean;
    /**
     * Checks whether the focusableComponent is actually participating in spatial navigation (in other words, is a
     * 'focusable' focusableComponent). Seems less confusing than calling it isFocusableFocusableComponent()
     */
    isParticipatingFocusableComponent(focusKey: string): boolean;
    onIntermediateNodeBecameFocused(focusKey: string, focusDetails: FocusDetails): void;
    onIntermediateNodeBecameBlurred(focusKey: string, focusDetails: FocusDetails): void;
    pause(): void;
    resume(): void;
    setFocus(focusKey: string, focusDetails?: FocusDetails): void;
    updateAllLayouts(): void;
    updateLayout(focusKey: string): void;
    updateFocusable(focusKey: string, { node, preferredChildFocusKey, focusable, isFocusBoundary, focusBoundaryDirections, onEnterPress, onEnterRelease, onArrowPress, onFocus, onBlur }: FocusableComponentUpdatePayload): void;
    isNativeMode(): boolean;
    doesFocusableExist(focusKey: string): boolean;
}
/**
 * Export singleton
 */
/** @internal */
export declare const SpatialNavigation: SpatialNavigationService;
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
export {};
