import {ActionIcon, Badge, Button, Container, Divider, Group, Paper, Progress, TextInput, useMantineTheme,} from '@mantine/core';
import {IconCalendar, IconCircleLetterN, IconHttpGet, IconLetterT, IconMarkdown, IconPictureInPicture, IconTags, IconUpload} from '@tabler/icons-react';
import {useRouter} from "next/router";
import {isNotEmpty, useForm} from "@mantine/form";
import 'md-editor-rt/lib/style.css';
import MdEditor from "md-editor-rt";
import {useState} from "react";
import {usePost, useTokenUpdate} from "@/hooks/Request";

interface Props {
    pid: string
    title: string
    content: string
    author: string
    date: string
    tags: string
    image_url: string
}

export default function PostEditor(props: Props) {
    const theme = useMantineTheme();
    const router = useRouter()

    const editorId = 'editor'
    const [text, setText] = useState(props.content);
    const {post, isLoading, error} = usePost(props.pid)
    const form = useForm({
        initialValues: {title: props.title, content: props.content, author: props.author, date: props.date, tags: props.tags, image_url: props.image_url},
        validate: {
            title: isNotEmpty('请输入标题'),
            tags: isNotEmpty('请至少一个tag'),
            image_url: isNotEmpty('请输入题图url')
        }
    })

    const {trigTokenUpdate} = useTokenUpdate(`/api/v1/post/${props.pid}`, form.values, {title: '文章更新成功', message: '将返回文章列表', color: 'green'})

    if (isLoading || error) {
        return <Progress/>
    }


    return (
        <Container>
            <Paper withBorder shadow={'sm'} px="md" radius="md" component="form" onSubmit={form.onSubmit(async () => {
                await trigTokenUpdate()
                await router.push('/admin/post')
            })}>
                <Group py={'xl'}>
                    <TextInput icon={<IconLetterT/>} placeholder={'文章标题'} required withAsterisk{...form.getInputProps('title')}></TextInput>
                    <TextInput icon={<IconTags/>} w={180} placeholder={'Tag1, Tag2...'} required withAsterisk{...form.getInputProps('tags')}></TextInput>
                    <TextInput icon={<IconCalendar/>} w={180} rightSection={
                        <ActionIcon variant="light" onClick={() => {
                            const d = new Date()
                            const month = d.getMonth() > 8 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)
                            const day = d.getDate() > 9 ? d.getDate() : '0' + d.getDate()
                            form.setFieldValue('date', `${d.getFullYear()}-${month}-${day}`)
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
                        {props.author}
                    </Badge>
                    <Group>
                        <IconMarkdown size={25} color={theme.colorScheme === 'light' ? "black" : "#909296"}/>
                        <Button onClick={() => {
                            form.setFieldValue('content', text)
                        }} leftIcon={<IconUpload size={15}/>} type="submit">提交</Button>
                    </Group>

                </Group>
            </Paper>
        </Container>
    )
}