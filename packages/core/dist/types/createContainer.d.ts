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
declare type Props = {
    navigation: NavigationScreenProp<any>;
    onBackToTop?: () => void;
    onLeaveTop?: () => void;
    screenProps: {
        url: string;
        initalProps: any;
    };
};
declare type State = {
    error: any;
    refreshTag: number;
};
export declare function createContainer({ Loading, ErrorTips, trackRenderError, injectFetch }: ContainerOptions): {
    new (props: any): {
        RemoteComponent: React.LazyExoticComponent<React.ComponentType<any>>;
        focusEvent: NavigationEventSubscription;
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
        setState<K extends "error" | "refreshTag">(state: State | ((prevState: Readonly<State>, props: Readonly<Props>) => State | Pick<State, K>) | Pick<State, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<Props> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<State>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Props>, prevState: Readonly<State>): any;
        componentDidUpdate?(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Props>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Props>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): void;
    };
    contextType?: React.Context<any>;
};
export {};
