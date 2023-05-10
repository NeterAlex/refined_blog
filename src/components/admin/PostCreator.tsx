import {ActionIcon, Badge, Button, Container, Divider, Group, Paper, Progress, TextInput, useMantineTheme,} from '@mantine/core';
import {IconCalendar, IconCircleLetterN, IconHttpGet, IconLetterT, IconMarkdown, IconPictureInPicture, IconTags, IconUpload} from '@tabler/icons-react';
import {useRouter} from "next/router";
import {isNotEmpty, useForm} from "@mantine/form";
import 'md-editor-rt/lib/style.css';
import MdEditor from "md-editor-rt";
import {useState} from "react";
import {useTokenRequest, useUser} from "@/hooks/Request";
import {useAtom} from "jotai";
import {UserAtom} from "@/store/User";
import {GetTimeNow} from "@/function/Time";

export function PostCreate() {
    const theme = useMantineTheme();
    const router = useRouter()
    const editorId = 'creator'
    const [text, setText] = useState('');
    const [currentUser, setCurrentUser] = useAtom(UserAtom)
    const {user, isLoading, error} = useUser(currentUser.uid);
    const form = useForm({
        initialValues: {title: '', content: '', author: '', date: '', tags: '', image_url: ''},
        validate: {
            title: isNotEmpty('请输入标题'),
            tags: isNotEmpty('请至少一个tag'),
            image_url: isNotEmpty('请输入题图url')
        }
    })
    const {trigTokenRequest} = useTokenRequest('/v1/post/create/', form.values, {title: '文章创建成功', message: '将返回文章列表', color: 'green'})
    if (isLoading || error) {
        return <Progress/>
    }
    return (
        <Container>
            <Paper withBorder shadow={'sm'} px="md" radius="md" component="form" onSubmit={form.onSubmit(async () => {
                await trigTokenRequest()
                await router.push('/admin/post')
            })}>
                <Group py={'xl'}>
                    <TextInput icon={<IconLetterT/>} placeholder={'文章标题'} required withAsterisk{...form.getInputProps('title')}></TextInput>
                    <TextInput icon={<IconTags/>} w={180} placeholder={'Tag1, Tag2...'} required withAsterisk{...form.getInputProps('tags')}></TextInput>
                    <TextInput icon={<IconCalendar/>} w={180} rightSection={
                        <ActionIcon variant="light" onClick={() => {
                            form.setFieldValue('date', GetTimeNow())
                        }}>
                            <IconCircleLetterN/>
                        </ActionIcon>

                    } placeholder="YYYY-MM-DD" required
                               withAsterisk{...form.getInputProps('date')}/>
                    <TextInput
                        rightSection={<ActionIcon variant="light" component={'a'} href={'https://www.pexels.com/zh-cn/'} target={'_blank'}><IconHttpGet/></ActionIcon>}
                        icon={<IconPictureInPicture/>}
                        placeholder={'题图 url'}
                        withAsterisk{...form.getInputProps('image_url')}></TextInput>
                </Group>

                <MdEditor style={{height: '60vh'}} editorId={editorId} theme={theme.colorScheme} modelValue={text} onChange={setText} preview={false} previewTheme={"github"}/>
                <Divider my={'md'}/>
                <Group position={"apart"} my={'md'}>
                    <Badge size="lg" radius="md">
                        {user.users[0].nickname}
                    </Badge>
                    <Group>
                        <IconMarkdown size={25} color={theme.colorScheme === 'light' ? "black" : "#909296"}/>
                        <Button disabled={user.users[0].status === 'guest'} leftIcon={<IconUpload size={15}/>} onClick={() => {
                            form.setFieldValue('content', text)
                            form.setFieldValue('author', user.users[0].username)
                        }} type="submit">提交</Button>
                    </Group>

                </Group>
            </Paper>
        </Container>
    )
}