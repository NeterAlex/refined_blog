import {Page} from "@/common/types";
import PostList from "@/components/post/PostList";
import {Badge, Button, Container, Divider, Group, Image, rem, SimpleGrid, Skeleton, Stack, Text, Title} from "@mantine/core";
import {usePostLatest} from "@/hooks/Request";
import {useRouter} from "next/router";
import {IconArrowRight} from "@tabler/icons-react";
import {animated, useSpring} from "@react-spring/web";
import Head from "next/head";
import React from "react";

const PostPage: Page = () => {
    const {latest, isLoading, error} = usePostLatest()
    const router = useRouter()
    const springs = useSpring({
        from: {x: -70, opacity: 0},
        to: {x: 0, opacity: 1},
    })
    if (isLoading || error) {
        return <Skeleton animate={true} height={300} mt={30}></Skeleton>
    }
    let appEnv = process.env.APP_ENV
    const globalBase = appEnv === 'production' ? 'https://api.neteralex.cn' : 'http://localhost:8022'
    return (
        <Container mt={rem(30)}>
            <Head>
                <title>Refined | 文章</title>
            </Head>
            <animated.div style={springs}>
                <SimpleGrid my={rem(30)} cols={2} spacing="md" breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                    <Image alt={'preview'} height={"35vh"} radius={'md'} src={latest.post.image_url}/>
                    <Stack spacing={2} justify={'space-between'}>
                        <Stack spacing={5}>
                            <Text ml={19} c={'dimmed'} size={'sm'}>{latest.post.date}</Text>
                            <Title ml={19} order={1}>{latest.post.title}</Title>
                            <Group mt={5} ml={19} position={"left"} spacing={rem(2)}>
                                {
                                    latest.post.tags.split(',').map((tag: any, id: any) => (<Badge radius="md" key={id + 1}>{tag}</Badge>))
                                }
                            </Group>
                        </Stack>
                        <Button rightIcon={<IconArrowRight/>} variant="subtle" w={125} onClick={() => {
                            fetch(`${globalBase}/v1/post/view/${latest.post.id}`).then(res => res.json())
                            router.push(`/post/${latest.post.id}`)
                        }}>
                            阅读本文
                        </Button>
                    </Stack>
                </SimpleGrid>
                <Divider my={30}/>
            </animated.div>
            <PostList/>
        </Container>
    )
}
export default PostPage
PostPage.Layout = 'Main'