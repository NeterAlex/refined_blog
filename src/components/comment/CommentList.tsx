import {Container, Skeleton} from "@mantine/core";
import {CommentCard} from "@/components/comment/CommentCard";
import CommentArea from "@/components/comment/CommentArea";
import {UserAtom} from "@/store/User";
import {useAtom} from "jotai";
import {useComment} from "@/hooks/Request";

interface Props {
    pid?: string
}

function dateToString(d: string) {
    const date = new Date(d).toJSON();
    return new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
}

export default function CommentList({pid}: Props) {
    //SWR
    const {comments, isLoading, error} = useComment(typeof pid === "string" ? pid : "0")

    //Getter
    const [currentUser, setCurrentUser] = useAtom(UserAtom)

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


    return (
        <Container mb={'md'}>
            <CommentArea image={currentUser.uid !== '0' ? `http://localhost:8022/static/avatar/${currentUser.uid}.jpg` : ''} uid={currentUser.uid}
                         pid={typeof pid === 'string' ? pid : '0'}/>
            {
                comments.comments.map((comment: any, i: any) => (
                    <CommentCard key={i + 1} uid={comment.userID} author={comment.author} image={`http://localhost:8022/static/avatar/${comment.userID}.jpg`} body={comment.content}
                                 postedAt={comment.date}></CommentCard>
                ))
            }
        </Container>
    )
}