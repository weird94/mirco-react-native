import React from 'react';
import { NavigationScreenProp, NavigationEventSubscription } from 'react-navigation';
declare type ContainerOptions = {
    Loading: React.ComponentType;
    ErrorTips: React.ComponentType<{
        onRetry?: () => void;
    }>;
    trackRenderError?: (error: any) => void;
    injectFetch?: typeof fetch;
};
export declare function createContainer({ Loading, ErrorTips, trackRenderError, injectFetch }: ContainerOptions): {
    new (props: any): {
        RemoteComponent: React.LazyExoticComponent<React.ComponentType<any>>;
        focusEvent: NavigationEventSubscription | null;
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
            navigation: NavigationScreenProp<any, import("react-navigation").NavigationParams>;
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
            navigation: NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{
            error: any;
            refreshTag: number;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<{
            navigation: NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }>, nextState: Readonly<{
            error: any;
            refreshTag: number;
        }>, nextContext: any): boolean;
        getSnapshotBeforeUpdate?(prevProps: Readonly<{
            navigation: NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }>, prevState: Readonly<{
            error: any;
            refreshTag: number;
        }>): any;
        componentDidUpdate?(prevProps: Readonly<{
            navigation: NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }>, prevState: Readonly<{
            error: any;
            refreshTag: number;
        }>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<{
            navigation: NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<{
            navigation: NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<{
            navigation: NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }>, nextState: Readonly<{
            error: any;
            refreshTag: number;
        }>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<{
            navigation: NavigationScreenProp<any, import("react-navigation").NavigationParams>;
            onBackToTop?: (() => void) | undefined;
        }>, nextState: Readonly<{
            error: any;
            refreshTag: number;
        }>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
};
export {};
