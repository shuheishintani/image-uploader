import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fafafb',
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <StylesProvider injectFirst>
      <MaterialUIThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </MaterialUIThemeProvider>
    </StylesProvider>
  );
};

export default MyApp;
