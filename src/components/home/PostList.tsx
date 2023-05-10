import {rem, Skeleton, Stack} from "@mantine/core";
import {useAllPosts} from "@/hooks/Request";
import {HomePostCard} from "@/components/home/PostCard";
import {Carousel} from "@mantine/carousel";

export default function HomePostList() {
    const {posts, isLoading, error} = useAllPosts()

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

    let data = [...posts.posts].slice(-7)
    data.pop()
    data.reverse()

    return (
        <Stack w={"100%"}>
            <Carousel slideSize="33%" height={280} align="start" slideGap="md" controlsOffset="md" breakpoints={[{maxWidth: 'sm', slideSize: '100%', slideGap: rem(2)}]} dragFree>
                {
                    data.map((post: any) => (
                        <Carousel.Slide key={post.id}>
                            <HomePostCard key={post.id} id={post.id} image={post.image_url} tags={post.tags} title={post.title} date={post.date} viewed={post.viewed}/>
                        </Carousel.Slide>
                    ))
                }
            </Carousel>
        </Stack>
    )
}