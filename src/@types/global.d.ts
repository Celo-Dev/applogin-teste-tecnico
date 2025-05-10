interface Console {
    tron: any;
}

declare var console: Console;
declare module '@env';

export type RootStackParamList = {
    Home: any;
    Login: any;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
