import {createTheme, ThemeProvider, useMediaQuery} from "@mui/material";
import {ReactElement, useMemo} from "react";
import {deDE} from '@mui/x-data-grid/locales';

declare module '@mui/material/styles' {

}

interface IProps {
    children: Array<ReactElement>;
}

const StyleProvider = ({children}: IProps) => {

    const prefersDarkMode: boolean = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                    primary: {
                        main: "#49ac67"
                    },
                    background: {
                        paper: prefersDarkMode ? "#181818" : "#f1f1f1"
                    },
                },
                components: {
                    MuiAppBar: {
                        defaultProps: {
                            color: "transparent"
                        },
                        styleOverrides: {
                            root: {
                                backgroundColor: "#49ac67"
                            }
                        }
                    },
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                width: "100%",
                                minHeight: "50px"
                            }
                        }
                    },
                    MuiCardContent: {
                        styleOverrides: {
                            root: {}
                        }
                    }
                }
            }, deDE),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )

}

export default StyleProvider;