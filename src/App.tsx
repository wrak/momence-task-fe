import {ThemeProvider} from 'styled-components';
import {QueryClientProvider, QueryClient} from 'react-query';
import {LayoutContainer, LayoutContent, LayoutColumns, LayoutColumn, Layout} from '@paljs/ui/Layout';
import {createTheme} from '@paljs/theme';

import {GlobalStyle} from './components/GlobalStyle.tsx';
import ConversionPage from './components/ConversionPage.tsx';

const fontFamily = 'Open Sans, sans-serif';

const theme = {
    fontFamilyPrimary: fontFamily,
    fontFamilySecondary: fontFamily,
    textHeading1FontFamily: fontFamily,
    textHeading2FontFamily: fontFamily,
    textHeading3FontFamily: fontFamily,
    textHeading4FontFamily: fontFamily,
    textHeading5FontFamily: fontFamily,
    textHeading6FontFamily: fontFamily,
    textSubtitleFontFamily: fontFamily,
    textSubtitle2FontFamily: fontFamily,
    textParagraphFontFamily: fontFamily,
    textParagraph2FontFamily: fontFamily,
    textCaptionFontFamily: fontFamily,
    textCaption2FontFamily: fontFamily,
};

const queryClient = new QueryClient(
    {
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    }
);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={createTheme('default', theme)}>
                <GlobalStyle/>
                {/* @ts-ignore Because selected design system library has poorly typed some components which doesn't allow children prop */}
                <Layout>
                    <LayoutContainer>
                        <LayoutContent>
                            <LayoutColumns>
                                <LayoutColumn>
                                    <ConversionPage/>
                                </LayoutColumn>
                            </LayoutColumns>
                        </LayoutContent>
                    </LayoutContainer>
                </Layout>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App
