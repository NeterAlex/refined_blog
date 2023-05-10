import {Page} from "@/common/types";
import PostList from "@/components/post/PostList";
import {Badge, Button, Container, Divider, Group, Image, rem, SimpleGrid, Skeleton, Stack, Text, Title} from "@mantine/core";
import {usePostLatest} from "@/hooks/Request";
import {useRouter} from "next/router";
import {IconArrowRight} from "@tabler/icons-react";
import {animated, useSpring} from "@react-spring/web";

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

    return (
        <Container mt={rem(30)}>
            <animated.div style={springs}>
                <SimpleGrid my={rem(30)} cols={2} spacing="md" breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                    <Image alt={'preview'} radius={'md'} src={latest.post.image_url}/>
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
                            fetch(`http://localhost:8022/api/v1/post/${latest.post.ID}/view`).then(res => res.json())
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