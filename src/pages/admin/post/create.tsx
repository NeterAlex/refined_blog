import {Page} from "@/common/types";
import {Container, useMantineTheme} from "@mantine/core";
import {PostCreate} from "@/components/admin/PostCreator";


const PostCreatePage: Page = () => {
    const theme = useMantineTheme()
    return (
        <Container my="md">
            <PostCreate/>
        </Container>
    )
}
export default PostCreatePage
PostCreatePage.Layout = 'Admin'