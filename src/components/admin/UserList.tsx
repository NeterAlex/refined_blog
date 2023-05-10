import {useState} from "react";
import {useRouter} from "next/router";
import {useAllUsers, useTokenDelete} from "@/hooks/Request";
import {ActionIcon, Avatar, Badge, Button, Checkbox, Container, Group, Input, Paper, Popover, ScrollArea, Skeleton, Table, Text, useMantineTheme} from "@mantine/core";
import Link from "next/link";
import {IconBan, IconSearch, IconUsers} from "@tabler/icons-react";

interface ConfirmPopupProps {
    username: string
    uid: number
}

function ConfirmPopup(props: ConfirmPopupProps) {
    const [deletable, setDeletable] = useState(false)
    const router = useRouter()
    const {trigTokenDelete} = useTokenDelete(`/user/${props.uid}`, {title: '用户删除成功', message: '', color: 'green'})
    return (
        <>
            <Group position={"apart"} mb={'md'}>
                <Group spacing={0}>
                    <Text>将删除以下用户的信息</Text>
                    <Text fw={1000} color={'red'}>[{props.username}]</Text>
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

export function UserList() {
    const theme = useMantineTheme();
    const router = useRouter()
    const {users, isLoading, error} = useAllUsers()
    const [search, setSearch] = useState('')

    if (isLoading || error) {
        return <Skeleton h={300} animate={true}/>
    }

    const rows = [...users.data.list].filter((v) => {
        if (v.username.includes(search) || v.nickname.includes(search) || v.email.includes(search)) {
            return v
        }
    }).map((item: any) => (
        <tr key={item.ID}>
            <td>
                <Badge variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}>
                    {item.ID}
                </Badge>
            </td>
            <td>
                <Group spacing="sm">
                    <Avatar src={`http://localhost:8022/static/avatar/${item.ID}.jpg`}/>
                    <Text c="dimmed" component={Link} href={`/post/${item.ID}`} fz="sm" fw={500}>
                        {item.username}
                    </Text>
                </Group>
            </td>

            <td>
                <Text fz="sm" c="dimmed">
                    {item.nickname}
                </Text>
            </td>
            <td>
                <Text fz="sm" c="dimmed">
                    {item.email}
                </Text>
            </td>
            <td>
                <Badge color={item.class === 'admin' ? 'red' : 'blue'}>
                    {item.class}
                </Badge>
            </td>
            <td>
                <Group spacing={0} position="right">
                    <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
                        <Popover.Target>
                            <ActionIcon disabled={item.class === 'admin'}>
                                <IconBan size="1rem" color={item.class === 'admin' ? 'gray' : 'red'} stroke={1.5}/>
                            </ActionIcon>
                        </Popover.Target>
                        <Popover.Dropdown sx={(theme) => ({background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white})}>
                            <ConfirmPopup uid={item.ID} username={item.username}/>
                        </Popover.Dropdown>
                    </Popover>

                </Group>
            </td>
        </tr>
    ));

    return (
        <Container>
            <Group position={"apart"} mb={'sm'}>
                <Input icon={<IconSearch/>} radius="md" placeholder="用户名、昵称、Email" value={search} onChange={(e) => setSearch(e.currentTarget.value)}/>
                <Group spacing={5}>
                    <IconUsers size={17}/>
                    <Text c={'dimmed'} size={'sm'}>
                        总用户数：{users.data.count}
                    </Text>
                </Group>
            </Group>
            <Paper shadow={'sm'} withBorder p="md" radius="md">
                <ScrollArea mah={'75vh'}>
                    <Table sx={{minWidth: 600}} verticalSpacing="sm">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>用户</th>
                            <th>昵称</th>
                            <th>Email</th>
                            <th>权限</th>
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