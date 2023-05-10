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
            <PostEditor author={post.data.list.author} content={post.data.list.content} date={post.data.list.date} image_url={post.data.list.image_url}
                        pid={typeof pid === 'string' ? pid : '0'}
                        tags={post.data.list.tags} title={post.data.list.title}/>
        </>
    )
}
export default PostEdit
PostEdit.Layout = 'Admin'