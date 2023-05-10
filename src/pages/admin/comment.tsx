import {Page} from "@/common/types";
import {Container} from "@mantine/core";
import {CommentList} from "@/components/admin/CommentList";

const CommentPage: Page = () => {
    return (
        <Container>
            <CommentList/>
        </Container>
    )
}

export default CommentPage
CommentPage.Layout = 'Admin'