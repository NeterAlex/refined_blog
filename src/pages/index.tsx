import Head from 'next/head'
import Home from "@/components/home/Home";
import React from "react";
import {Page} from "@/common/types";

const HomePage: Page = () => {
    return (
        <>
            <Head>
                <title>Refined</title>
                <meta name="description" content="精锻地 Refined"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <Home/>
            </main>
        </>
    )
}

export default HomePage
HomePage.Layout = 'Main'
