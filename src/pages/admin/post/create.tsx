import {Page} from "@/common/types";
import {Container} from "@mantine/core";
import {PostCreate} from "@/components/admin/PostCreator";


const PostCreatePage: Page = () => {
    return (
        <Container my="md">
            <PostCreate/>
        </Container>
    )
}
export default PostCreatePage
PostCreatePage.Layout = 'Admin'