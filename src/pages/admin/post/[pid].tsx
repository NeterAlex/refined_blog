import {Progress,} from '@mantine/core';
import {useRouter} from "next/router";
import 'md-editor-rt/lib/style.css';
import {usePost} from "@/hooks/Request";
import {Page} from "@/common/types";
import PostEditor from "@/components/admin/PostEditor";

const PostEdit: Page = () => {
    const router = useRouter()
    const {pid} = router.query
    const {post, isLoading, error} = usePost(typeof pid === "string" ? pid : '0')

    if (isLoading || error) {
        return <Progress/>
    }

    return (
        <>
            <PostEditor author={post.posts[0].author} content={post.posts[0].content} date={post.posts[0].date} image_url={post.posts[0].image_url}
                        pid={typeof pid === 'string' ? pid : '0'}
                        tags={post.posts[0].tags} title={post.posts[0].title}/>
        </>
    )
}
export default PostEdit
PostEdit.Layout = 'Admin'