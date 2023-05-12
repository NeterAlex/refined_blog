import {Badge, Card, Container, Divider, Group, Image, rem, Skeleton, Text, useMantineTheme} from "@mantine/core";
import {useRouter} from "next/router";
import MdEditor, {ExposeParam} from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import {useRef} from "react";
import {IconCalendar, IconEye, IconTags, IconUser} from "@tabler/icons-react";
import CommentList from "@/components/comment/CommentList";
import {Page} from "@/common/types";
import {animated, useSpring} from "@react-spring/web";
import {usePost} from "@/hooks/Request";

const PostPage: Page = () => {
    //Router
    const router = useRouter()
    const {pid} = router.query

    //Theme
    const theme = useMantineTheme();

    //MdEditor
    const editorRef = useRef<ExposeParam>()
    editorRef.current?.toggleCatalog(true)
    const editorId = 'previewer'


    //SWR
    const {post, isLoading, error} = usePost(typeof pid === "string" ? pid : "0")

    //Animate
    const springs = useSpring({
        from: {x: -70, opacity: 0},
        to: {x: 0, opacity: 1},
    })

    if (isLoading) {
        return (
            <animated.div style={springs}>
                <Container my="md">
                    <Card shadow="md" radius="md" mt="xl">
                        <Card.Section mb="xl">
                            <Skeleton animate={true} height={180}/>
                        </Card.Section>
                        <Card.Section mb="md">
                            <Group pl="xl" position="apart">
                                <Skeleton animate={true} height={30}/>
                            </Group>
                        </Card.Section>
                        <Divider/>
                        <Skeleton animate={true} height={"60vh"}/>

                        <Divider mt={'xl'}/>
                        <Card.Section>
                            <Skeleton animate={true} height={100}/>
                        </Card.Section>
                    </Card>
                </Container>
            </animated.div>
        )
    }

    if (error) {
        return (
            <Skeleton w={"100%"} height={600} radius="md" animate={true}/>
        )
    }
    return (
        <animated.div style={springs}>

            <Container my="md">
                <Card shadow="md" radius="md" mt="xl">
                    <Card.Section mb="xl">
                        <Image src={post.posts[0].image_url} alt={post.posts[0].title} height={180}/>
                    </Card.Section>
                    <Card.Section mb="md">
                        <Group pl="xl" position="apart">
                            <Group>
                                <Group spacing={4}>
                                    <IconUser size={rem(20)} stroke={"2"} color={theme.colors.blue[9]}/>
                                    <Text fz="sm" c="dimmed">{post.posts[0].author}</Text>
                                </Group>
                                <Group spacing={4}>
                                    <IconCalendar size={rem(20)} stroke={"2"} color={theme.colors.blue[9]}/>
                                    <Text fz="sm" c="dimmed">{post.posts[0].date}</Text>
                                </Group>
                            </Group>
                            <Group mr="md">
                                <Group spacing={4} position={"right"}>
                                    <IconTags size={rem(20)} stroke={"2"} color={theme.colors.blue[9]}/>
                                    {
                                        post.posts[0].tags?.split(',').map((tag: any, id: any) => (<Badge radius="md" key={id + 1}>{tag}</Badge>))
                                    }
                                </Group>
                                <Group spacing={4}>
                                    <IconEye size={rem(20)} stroke={"2"} color={theme.colors.blue[9]}/>
                                    <Text fz="sm" c="dimmed">{post.posts[0].viewed + ' 次阅读'}</Text>
                                </Group>
                            </Group>
                        </Group>
                    </Card.Section>
                    <Divider/>
                    <MdEditor editorId={editorId} theme={theme.colorScheme} modelValue={post.posts[0].content} previewOnly={true} previewTheme={"github"}/>

                    <Divider mt={'xl'}/>
                    <Card.Section>
                        <CommentList pid={pid === undefined ? "0" : pid.toString()}/>
                    </Card.Section>
                </Card>
            </Container>

        </animated.div>

    )
}

export default PostPage
PostPage.Layout = 'Main'