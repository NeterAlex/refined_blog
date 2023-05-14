import {Page} from "@/common/types";
import {Container} from "@mantine/core";
import {AboutCard} from "@/components/home/AboutCard";
import {animated, useSpring} from "@react-spring/web";
import Head from "next/head";
import React from "react";

const AboutPage: Page = () => {
    const springs = useSpring({
        from: {y: -70, opacity: 0},
        to: {y: 0, opacity: 1},
    })
    let appEnv = process.env.APP_ENV
    const globalBase = appEnv === 'production' ? 'https://api.neteralex.cn' : 'http://localhost:8022'
    return (
        <animated.div style={springs}>
            <Container my="xl">
                <Head>
                    <title>Refined | 关于</title>
                </Head>
                <AboutCard image={'https://images.pexels.com/photos/3648850/pexels-photo-3648850.jpeg?auto=compress&cs=tinysrgb&w=1600'}
                           avatar={`${globalBase}/static/avatar/1.jpg`} name={'NeterAlex'} job={'Student'}/>
            </Container>
        </animated.div>

    )
}

export default AboutPage
AboutPage.Layout = 'Main'