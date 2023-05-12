import {Center, Pagination, rem, SimpleGrid, Skeleton, Stack} from "@mantine/core";
import {PostCard} from "@/components/post/PostCard";
import {useState} from "react";
import {usePostList} from "@/hooks/Request";
import {animated, useSpring} from '@react-spring/web'

export default function PostList() {
    const [pageIndex, setPageIndex] = useState(1)
    const {posts, isLoading, error} = usePostList(pageIndex, 10)
    const springs = useSpring({
        from: {x: -70, opacity: 0},
        to: {x: 0, opacity: 1},
    })

    if (isLoading) {
        return (
            <Skeleton w={"100%"} height={300} radius="md" animate={true}/>
        )
    }

    if (error) {
        return (
            <Skeleton w={"100%"} height={300} radius="md" animate={true}/>
        )
    }

    let data = [...posts.posts]

    if (pageIndex === 1) {
        data.pop()
    }

    return (
        <Stack w={"100%"}>
            <animated.div style={{...springs,}}>
                <SimpleGrid w={"auto"} cols={2} spacing="md" breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                    {
                        data.reverse().map((post: any) => (
                            <PostCard key={post.id} id={post.id} image={post.image_url} tags={post.tags} title={post.title} date={post.date} viewed={post.viewed}/>
                        ))
                    }
                </SimpleGrid>
            </animated.div>
            <Center>
                <Pagination value={pageIndex} onChange={setPageIndex} total={Math.ceil(posts.total / 10)} pt={rem(40)}/>
            </Center>
        </Stack>
    )
}