import {Page} from "@/common/types";
import {Container} from "@mantine/core";
import {PostList} from "@/components/admin/PostList";


const PostPage: Page = () => {
    return (
        <Container my="md">
            <PostList/>
        </Container>
    )
}
export default PostPage
PostPage.Layout = 'Admin'