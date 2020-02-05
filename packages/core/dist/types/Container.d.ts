/// <reference types="react" />
declare const Container: {
    new (props: any): {
        RemoteComponent: import("react").LazyExoticComponent<import("react").ComponentType<any>>;
        focusEvent: import("react-navigation").NavigationEventSubscription | null;
        buildComponent(): void;
        handleRetry: () => void;
        handleRefresh: () => void;
        addFocusEvent(): void;
        removeFocusEvent(): void;
        handleFocus(): void;
        componentDidCatch(error: any): void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        context: any;
        setState<K extends "error" | "refreshTag">(state: {
            error: any;
            refreshTag: number;
        } | ((prevState: Readonly<{
            error: any;
            refreshTag: number;
        }>, props: Readonly<{
            navigation: import("react-navigation").NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }>) => {
            error: any;
            refreshTag: number;
        } | Pick<{
            error: any;
            refreshTag: number;
        }, K> | null) | Pick<{
            error: any;
            refreshTag: number;
        }, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<{
            navigation: import("react-navigation").NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<{
            error: any;
            refreshTag: number;
        }>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<{
            navigation: import("react-navigation").NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }>, nextState: Readonly<{
            error: any;
            refreshTag: number;
        }>, nextContext: any): boolean;
        getSnapshotBeforeUpdate?(prevProps: Readonly<{
            navigation: import("react-navigation").NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }>, prevState: Readonly<{
            error: any;
            refreshTag: number;
        }>): any;
        componentDidUpdate?(prevProps: Readonly<{
            navigation: import("react-navigation").NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }>, prevState: Readonly<{
            error: any;
            refreshTag: number;
        }>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<{
            navigation: import("react-navigation").NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<{
            navigation: import("react-navigation").NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<{
            navigation: import("react-navigation").NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }>, nextState: Readonly<{
            error: any;
            refreshTag: number;
        }>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<{
            navigation: import("react-navigation").NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }>, nextState: Readonly<{
            error: any;
            refreshTag: number;
        }>, nextContext: any): void;
    };
    contextType?: import("react").Context<any> | undefined;
};
export default Container;
