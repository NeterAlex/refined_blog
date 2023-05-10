import {ActionIcon, Badge, Button, Checkbox, Container, Group, Input, Paper, Popover, ScrollArea, Skeleton, Table, Text, useMantineTheme,} from '@mantine/core';
import {IconPencil, IconSearch, IconTrash} from '@tabler/icons-react';
import {useAllPosts, useTokenDelete} from "@/hooks/Request";
import Link from "next/link";
import {useRouter} from "next/router";
import {useState} from "react";

interface ConfirmPopupProps {
    title: string
    pid: number
}

function ConfirmPopup(props: ConfirmPopupProps) {
    const [deletable, setDeletable] = useState(false)
    const router = useRouter()
    const {trigTokenDelete} = useTokenDelete(`/api/v1/post/${props.pid}`, {title: '文章删除成功', message: '', color: 'green'})
    return (
        <>
            <Group position={"apart"} mb={'md'}>
                <Group spacing={0}>
                    <Text>将永久删除</Text>
                    <Text fw={1000} color={'red'}>[{props.title}]</Text>
                </Group>
            </Group>
            <Group position={'apart'}>
                <Checkbox checked={deletable} onChange={(e) => setDeletable(e.currentTarget.checked)} label={'确认'}></Checkbox>
                <Button disabled={!deletable} color={'red'} onClick={async () => {
                    await trigTokenDelete()
                    await router.replace('/admin/post')
                }}>删除</Button>
            </Group>
        </>
    )
}

export function PostList() {
    const theme = useMantineTheme();
    const router = useRouter()
    const {posts, isLoading, error} = useAllPosts()
    const [search, setSearch] = useState('')

    if (isLoading || error) {
        return <Skeleton h={300} animate={true}/>
    }

    const rows = [...posts.data.list].filter((v) => {
        if (v.title.includes(search) || v.date.includes(search) || v.tags.includes(search)) {
            return v
        }
    }).reverse().map((item: any) => (
        <tr key={item.ID}>
            <td>
                <Group spacing="sm">
                    <Text component={Link} href={`/post/${item.ID}`} fz="sm" fw={500}>
                        {item.title}
                    </Text>
                </Group>
            </td>

            <td>
                <Badge
                    variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
                >
                    {item.tags}
                </Badge>
            </td>
            <td>
                <Text fz="sm" c="dimmed">
                    {item.author}
                </Text>
            </td>
            <td>
                <Text fz="sm" c="dimmed">
                    {item.date}
                </Text>
            </td>
            <td>
                <Text fz="sm" c="dimmed">
                    {item.viewed}
                </Text>
            </td>
            <td>
                <Group spacing={0} position="right">
                    <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
                        <Popover.Target>
                            <ActionIcon onClick={() => router.push(`/admin/post/${item.ID}`)}>
                                <IconTrash size="1rem" color={'red'} stroke={1.5}/>
                            </ActionIcon>
                        </Popover.Target>
                        <Popover.Dropdown sx={(theme) => ({background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white})}>
                            <ConfirmPopup pid={item.ID} title={item.title}/>
                        </Popover.Dropdown>
                    </Popover>

                    <ActionIcon onClick={() => router.push(`/admin/post/${item.ID}`)}>
                        <IconPencil size="1rem" stroke={1.5}/>
                    </ActionIcon>
                </Group>
            </td>
        </tr>
    ));

    return (
        <Container>
            <Group position={"apart"} mb={'sm'}>
                <Input icon={<IconSearch/>} radius="md" placeholder="标题、tag、日期" value={search} onChange={(e) => setSearch(e.currentTarget.value)}/>
                <Button leftIcon={<IconPencil size={15}/>} onClick={() => router.push(`/admin/post/create`)}>新建文章</Button>
            </Group>
            <Paper shadow={'sm'} withBorder p="md" radius="md">
                <ScrollArea mah={'75vh'}>
                    <Table sx={{minWidth: 600}} verticalSpacing="sm">
                        <thead>
                        <tr>
                            <th>标题</th>
                            <th>标签</th>
                            <th>作者</th>
                            <th>发布日期</th>
                            <th>浏览量</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </ScrollArea>
            </Paper>
        </Container>
    )
}