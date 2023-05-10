import {Badge, Container, Group, Paper, ScrollArea, Skeleton, Table, Text, useMantineTheme,} from '@mantine/core';
import {useAllPosts} from "@/hooks/Request";
import Link from "next/link";


export function PostListCard() {
    const theme = useMantineTheme();
    const {posts, isLoading, error} = useAllPosts()
    if (isLoading || error) {
        return <Skeleton h={300} animate={true}/>
    }
    const rows = [...posts.posts].reverse().map((item: any) => (
        <tr key={item.id}>
            <td>
                <Group spacing="sm">
                    <Text component={Link} href={`/post/${item.id}`} fz="sm" fw={500}>
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
                    {item.date}
                </Text>
            </td>
            <td>
                <Text fz="sm" c="dimmed">
                    {item.viewed}
                </Text>
            </td>
        </tr>
    ));

    return (
        <Container>
            <Paper shadow={'sm'} withBorder p="md" radius="md">
                <ScrollArea h={'50vh'}>
                    <Table sx={{minWidth: 800}} verticalSpacing="sm">
                        <thead>
                        <tr>
                            <th>标题</th>
                            <th>标签</th>
                            <th>发布日期</th>
                            <th>浏览量</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </ScrollArea>
            </Paper>
        </Container>
    )
}