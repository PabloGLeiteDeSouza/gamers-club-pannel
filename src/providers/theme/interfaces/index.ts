export interface IThemeProviderProps {
    children: React.ReactNode;
    defautltTheme?: string;
    storageKey?: string;
    documentAtrkibutekey?: string;
    LoadingComponent?: React.FC;
}