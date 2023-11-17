// import React, {ReactNode, useContext} from 'react';
//
// export interface Config {
//     baseApiUrl: string;
// }
//
// let ConfigContext: React.Context<Config>;
//
// export const useConfig = () => {
//     return useContext(ConfigContext);
// }
//
// interface ConfigProviderProps {
//     children: ReactNode;
// }
//
// export const ConfigProvider: React.FC<ConfigProviderProps> = (props: ConfigProviderProps) => {
//     const {children} = props;
//
//     if (!ConfigContext) {
//         if (!("config" in window)) {
//             throw new Error('No config in window');
//         }
//
//         const config: Config = {
//             // @ts-ignore
//             ...(window.config as Config),
//         };
//
//         ConfigContext = React.createContext(config);
//
//         // @ts-ignore
//         delete window['config'];
//     }
//
//     const config = useConfig();
//
//     return (
//         <ConfigContext.Provider value={config}>
//             {children}
//             </ConfigContext.Provider>
//     );
// }
