import {BackgroundImage, Box, Button, Center, Container, Flex, Group, Skeleton, Stack, Title} from '@mantine/core';
import {usePostLatest} from "@/hooks/Request";
import {useRouter} from "next/router";
import Banner from "@/components/home/Banner";
import HomePostList from "@/components/home/PostList";
import {animated, useSpring} from "@react-spring/web";

export default function Home() {
    const router = useRouter()
    const {latest, isLoading, error} = usePostLatest()
    const springs1 = useSpring({
        from: {y: -70, opacity: 0},
        to: {y: 0, opacity: 1},
    })
    const springs2 = useSpring({
        from: {x: -70, opacity: 0},
        to: {x: 0, opacity: 1},
    })
    let appEnv = process.env.APP_ENV
    const globalBase = appEnv === 'production' ? 'https://api.neteralex.cn' : 'http://localhost:8022'
    if (isLoading || error) {
        return (
            <animated.div style={springs1}>
                <Box>
                    <Skeleton animate={true} mih={200} height={"40vh"}/>
                    <animated.div style={springs2}>
                        <Container my="md">
                            <Banner title={'Loading'} height={'100'} link={'/'}/>
                            <Center>
                                <Skeleton animate={true} height={"30vh"}/>
                            </Center>
                        </Container>
                    </animated.div>
                </Box>
            </animated.div>
        )
    }
    return (
        <animated.div style={springs1}>
            <Box>
                <BackgroundImage mih={200} src={latest.post.image_url} h={'50vh'}>
                    <Flex h={'100%'} align='center' justify='center'>
                        <Stack align="center" justify={'center'}>
                            <Title order={1} color={'white'} mb={'md'}>
                                {latest.post.title}
                            </Title>
                            <Center>
                                <Group>
                                    <Button variant="white" color="dark" onClick={() => {
                                        fetch(`${globalBase}/v1/post/view/${latest.post.id}`).then(res => res.json())
                                        router.push(`/post/${latest.post.id}`)
                                    }}>
                                        阅读本文
                                    </Button>
                                </Group>
                            </Center>
                        </Stack>
                    </Flex>
                </BackgroundImage>
                <animated.div style={springs2}>
                    <Container my="md">
                        <Banner title={'最新文章'} height={'100'} link={'/post'}/>
                        <Center>
                            <HomePostList/>
                        </Center>
                    </Container>
                </animated.div>

            </Box>
        </animated.div>
    )
}