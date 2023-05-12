import {Accordion, ActionIcon, Avatar, Badge, Button, Center, Checkbox, Container, Group, Input, Paper, Popover, Skeleton, Table, Text,} from '@mantine/core';
import {IconArticle, IconInfoCircle, IconSearch, IconTrash} from '@tabler/icons-react';
import {useAllPosts, useTokenDelete} from "@/hooks/Request";
import {useRouter} from "next/router";
import {useState} from "react";

interface ConfirmPopupProps {
    cid: number
    pid: number
}

function ConfirmPopup(props: ConfirmPopupProps) {
    const [deletable, setDeletable] = useState(false)
    const router = useRouter()
    const {trigTokenDelete} = useTokenDelete(`/v1/comment/delete/${props.cid}`, {title: '评论删除成功', message: '', color: 'green'})
    return (
        <>
            <Group position={"apart"} mb={'md'}>
                <Group spacing={0}>
                    <Text>确定要删除这条评论吗？</Text>
                </Group>
            </Group>
            <Group position={'apart'}>
                <Checkbox checked={deletable} onChange={(e) => setDeletable(e.currentTarget.checked)} label={'确认'}></Checkbox>
                <Button disabled={!deletable} color={'red'} onClick={async () => {
                    await trigTokenDelete()
                    router.reload()
                }}>删除</Button>
            </Group>
        </>
    )
}


export function CommentList() {
    const router = useRouter()
    const {posts, isLoading, error} = useAllPosts()
    const [search, setSearch] = useState('')
    let appEnv = process.env.APP_ENV
    const globalBase = appEnv === 'production' ? 'https://api.neteralex.cn' : 'http://localhost:8022'
    if (isLoading || error) {
        return <Skeleton h={300} animate={true}/>
    }
    const items = [...posts.posts].filter((i: any) => {
        if (i.title.includes(search) || i.date.includes(search) || i.tags.includes(search)) {
            return i
        }
    }).reverse().filter((item: any) => {
        if (item.comments.length > 0) {
            return item
        }
    }).map((item: any) => (
        <Accordion.Item key={item.id} value={`${item.id}`}>
            <Accordion.Control>
                <Group position={'apart'}>
                    <Group>
                        <IconArticle stroke={1}/>
                        <Text>{item.title}</Text>
                    </Group>
                    <Badge>{item.comments.length}</Badge>
                </Group>

            </Accordion.Control>
            <Accordion.Panel>
                {
                    item.comments.length === 0 ? (
                        <Center>
                            <Text size={'sm'}>还没有评论</Text>
                        </Center>

                    ) : (
                        <Table sx={{minWidth: 600}} verticalSpacing="sm">
                            <thead>
                            <tr>
                                <th>日期</th>
                                <th>内容</th>
                                <th>作者</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                item.comments.map((comment: any) => (
                                    <tr key={comment.id}>
                                        <td>
                                            <Text fz="sm" c="dimmed">
                                                {comment.date}
                                            </Text>
                                        </td>
                                        <td>
                                            <Text fz="sm" c="dimmed">
                                                {comment.content}
                                            </Text>
                                        </td>
                                        <td>
                                            <Group spacing={10}>
                                                <Avatar src={`${globalBase}/static/avatar/${comment.userID}.jpg`}/>
                                                <Text c={'dimmed'} size={'sm'}>{comment.author}</Text>
                                            </Group>
                                        </td>
                                        <td>
                                            <Group spacing={0} position="right">
                                                <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
                                                    <Popover.Target>
                                                        <ActionIcon onClick={() => router.push(`/admin/post/${item.id}`)}>
                                                            <IconTrash size="1rem" color={'red'} stroke={1.5}/>
                                                        </ActionIcon>
                                                    </Popover.Target>
                                                    <Popover.Dropdown sx={(theme) => ({background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white})}>
                                                        <ConfirmPopup cid={comment.id} pid={item.id}/>
                                                    </Popover.Dropdown>
                                                </Popover>
                                            </Group>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    )
                }

            </Accordion.Panel>
        </Accordion.Item>
    ));

    return (
        <Container>
            <Group position={"apart"} mb={'sm'}>
                <Input icon={<IconSearch/>} radius="md" placeholder="标题、tag、日期" value={search} onChange={(e) => setSearch(e.currentTarget.value)}/>
                <Group spacing={5}>
                    <IconInfoCircle size={17}/>
                    <Text c={'dimmed'} size={'sm'}>仅显示有评论的文章</Text>
                </Group>
            </Group>
            <Paper shadow={'sm'} withBorder p="md" radius="md">
                <Accordion
                    mx="auto"
                    radius="xs"
                >
                    {items}
                </Accordion>
            </Paper>
        </Container>
    )
}