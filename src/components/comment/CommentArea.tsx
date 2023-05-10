import {Box, Button, Card, Collapse, Divider, Flex, Group, rem, Text, useMantineTheme} from "@mantine/core";
import MdEditor, {ExposeParam} from "md-editor-rt";
import {useRef, useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import {IconMessage, IconMessagePlus, IconPencil} from "@tabler/icons-react";
import 'md-editor-rt/lib/style.css';
import {useBasicUser, useTokenRequest} from "@/hooks/Request";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {UserAtom} from "@/store/User";

interface Props {
    uid: string
    pid: string
    image: string
}

export default function CommentArea({uid, pid, image}: Props) {
    const [opened, {toggle}] = useDisclosure(false);
    const router = useRouter()
    //Theme
    const theme = useMantineTheme();

    //MdEditor
    const editorRef = useRef<ExposeParam>()
    editorRef.current?.toggleCatalog(true)
    const editorId = 'comment'
    const [text, setText] = useState("")

    const [currentUser, setCurrentUser] = useAtom(UserAtom)
    const {user, isLoading, error} = useBasicUser(uid)

    const {trigTokenRequest} = useTokenRequest(`/api/v1/post/${pid}/comment`, {author: user.data.list.nickname, content: text, uid: uid}, {
        title: '评论成功',
        message: '',
        color: 'green'
    })

    return (
        <Box>
            <Card.Section my="md">
                <Group pl="xl" position="apart">
                    <Group spacing={4}>
                        <IconMessage size={rem(30)} stroke={"2"} color={theme.colors.blue[9]}/>
                        <Text fz="lg" c="dimmed">评论</Text>
                    </Group>
                    {
                        currentUser.token !== '' ?
                            <Button mr={'md'} color={opened ? "cyan" : "blue"} variant={'subtle'} onClick={toggle}>{opened ? "收起" : <IconMessagePlus/>}</Button> :
                            <Button mr={'md'} disabled={true} color={opened ? "cyan" : "blue"} variant={'subtle'} onClick={toggle}>{opened ? "收起" : "登录以评论"}</Button>
                    }
                </Group>
            </Card.Section>
            <Divider/>
            <Collapse in={opened} transitionTimingFunction="linear" my={"md"}>
                <MdEditor editorId={editorId} style={{height: "200px"}} preview={false} theme={theme.colorScheme} modelValue={text} onChange={setText}
                          previewTheme={"github"}
                          toolbars={['revoke', 'next',]}/>
                <Group position={"apart"}>
                    <Flex gap={5} justify={'center'} align={'center'}>
                        <IconPencil color={theme.colorScheme === 'light' ? "black" : "white"}/>
                        <Text color="dimmed" size="sm">
                            纯文本
                        </Text>
                    </Flex>
                    <Button my={"md"} onClick={async () => {
                        await trigTokenRequest()
                        router.reload()
                    }}>提交</Button>
                </Group>
                <Divider/>
            </Collapse>
        </Box>
    )
}