import {Page} from "@/common/types";
import {Box, Card, Container, Divider, Group, Image, rem, Skeleton, Text, Timeline, useMantineTheme} from "@mantine/core";
import {IconArchive, IconArticle} from "@tabler/icons-react";
import {useAllPosts} from "@/hooks/Request";
import Link from "next/link";
import {animated, useSpring} from "@react-spring/web";

const ArchivePage: Page = () => {
    const {posts, isLoading, error} = useAllPosts()
    const theme = useMantineTheme()
    const springs = useSpring({
        from: {y: -70, opacity: 0},
        to: {y: 0, opacity: 1},
    })
    if (isLoading || error) {
        return <Skeleton height={300} animate={true}></Skeleton>
    }


    return (
        <animated.div style={springs}>
            <Container>
                <Card withBorder shadow="sm" mt={30} radius="md">
                    <Card.Section mb="xl">
                        <Image src={'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1600'} alt={'bg'} height={120}/>
                    </Card.Section>
                    <Card.Section mb="md">
                        <Group pl="xl" position="apart">
                            <Group>
                                <Group spacing={4}>
                                    <IconArchive size={rem(30)} stroke={"2"} color={theme.colors.blue[9]}/>
                                    <Text fz="lg" c="dimmed">归档</Text>
                                </Group>
                            </Group>
                            <Group mr="md">
                            </Group>
                        </Group>
                    </Card.Section>
                    <Divider/>
                    <Box p={20}>
                        <Timeline bulletSize={30}>
                            {
                                [...posts.posts].reverse().map((post: any) => (
                                    <Timeline.Item key={post.ID} bullet={<IconArticle size={20}/>} c={'dimmed'}>
                                        <Text color={'dimmed'} size={'sm'}>{post.date}</Text>
                                        <Text component={Link} color={'blue'} href={`/post/${post.id}`}>{post.title}</Text>
                                        {
                                            <Group position={"left"} spacing={rem(2)}>
                                                {
                                                    post.tags.split(',').map((tag: any, id: any) => (<Text color={'dimmed'} size={'xs'} key={id}>{tag}</Text>))
                                                }
                                            </Group>
                                        }
                                    </Timeline.Item>
                                ))
                            }
                        </Timeline>
                    </Box>
                </Card>
            </Container>
        </animated.div>

    )
}

export default ArchivePage
ArchivePage.Layout = 'Main'