/// <reference types="react" />
/// <reference types="react-navigation" />
declare const Container: {
    new (props: any): {
        RemoteComponent: import("react").LazyExoticComponent<import("react").ComponentType<any>>;
        focusEvent: import("react-navigation").NavigationEventSubscription;
        buildComponent(): void;
        handleRetry: () => void;
        handleRefresh: () => void;
        addFocusEvent(): void;
        removeFocusEvent(): void;
        getStackDepth: () => any;
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
            onBackToTop?: () => void;
            screenProps: {
                url: string;
                initalProps: any;
            };
        }>) => {
            error: any;
            refreshTag: number;
        } | Pick<{
            error: any;
            refreshTag: number;
        }, K>) | Pick<{
            error: any;
            refreshTag: number;
        }, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<{
            navigation: import("react-navigation").NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: () => void;
            screenProps: {
                url: string;
                initalProps: any;
            };
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
            onBackToTop?: () => void;
            screenProps: {
                url: string;
                initalProps: any;
            };
        }>, nextState: Readonly<{
            error: any;
            refreshTag: number;
        }>, nextContext: any): boolean;
        getSnapshotBeforeUpdate?(prevProps: Readonly<{
            navigation: import("react-navigation").NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: () => void;
            screenProps: {
                url: string;
                initalProps: any;
            };
        }>, prevState: Readonly<{
            error: any;
            refreshTag: number;
        }>): any;
        componentDidUpdate?(prevProps: Readonly<{
            navigation: import("react-navigation").NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: () => void;
            screenProps: {
                url: string;
                initalProps: any;
            };
        }>, prevState: Readonly<{
            error: any;
            refreshTag: number;
        }>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<{
            navigation: import("react-navigation").NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: () => void;
            screenProps: {
                url: string;
                initalProps: any;
            };
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<{
            navigation: import("react-navigation").NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: () => void;
            screenProps: {
                url: string;
                initalProps: any;
            };
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<{
            navigation: import("react-navigation").NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: () => void;
            screenProps: {
                url: string;
                initalProps: any;
            };
        }>, nextState: Readonly<{
            error: any;
            refreshTag: number;
        }>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<{
            navigation: import("react-navigation").NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: () => void;
            screenProps: {
                url: string;
                initalProps: any;
            };
        }>, nextState: Readonly<{
            error: any;
            refreshTag: number;
        }>, nextContext: any): void;
    };
    contextType?: import("react").Context<any>;
};
export default Container;
