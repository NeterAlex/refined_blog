import '@/styles/globals.css'
import NextApp, {AppContext} from 'next/app';
import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core'
import {getCookie, setCookie} from 'cookies-next'
import {SWRConfig} from "swr"
import axios from "axios"
import React, {useState} from "react"
import {Notifications} from "@mantine/notifications";
import {useRouter} from "next/router";
import {RouterTransition} from "@/components/RouterTransition";
import {Layouts} from "@/layout/LayoutProvider";
import {RefinedAppProps} from "@/common/types";
import {useAtom} from "jotai";
import {UserAtom} from "@/store/User";


export default function App(props: RefinedAppProps & { colorScheme: ColorScheme }) {
    const {Component, pageProps} = props;
    const router = useRouter()

    // Mantine
    const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
        setColorScheme(nextColorScheme);
        setCookie('mantine-colzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzor-scheme', nextColorScheme, {maxAge: 60 * 60 * 24 * 30});
    }
    const Layout = Layouts[Component.Layout] ?? ((page) => page)

    // User
    const [currentUser, setCurrentUser] = useAtom(UserAtom)

    // Axios
    axios.defaults.timeout = 5000
    axios.defaults.baseURL = 'http://localhost:8022'
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

    // App
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
                <SWRConfig value={{
                    onErrorRetry: (error) => {
                        if (error.status === 404) return
                    }, fetcher: url => axios.get(url, {headers: {Authorization: `Bearer ${currentUser.token}`}}).then(r => r.data)
                }}>
                    <Layout>
                        <RouterTransition/>
                        <Notifications/>
                        <Component {...pageProps} />
                    </Layout>
                </SWRConfig>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

App.getInitialProps = async (appContext: AppContext) => {
    const appProps = await NextApp.getInitialProps(appContext);
    return {
        ...appProps,
        colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'light',
    };
};
