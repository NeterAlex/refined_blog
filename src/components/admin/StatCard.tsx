import {Container, createStyles, Group, Paper, rem, SimpleGrid, Skeleton, Text} from '@mantine/core';
import {IconArchive, IconArticle, IconCoin, IconDiscount2, IconEye, IconReceipt2, IconUser,} from '@tabler/icons-react';
import {useStatCounts} from "@/hooks/Request";

const useStyles = createStyles((theme) => ({
    root: {
        padding: `calc(${theme.spacing.xl} * 1.5)`,
    },

    value: {
        fontSize: rem(24),
        fontWeight: 700,
        lineHeight: 1,
    },

    diff: {
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    title: {
        fontWeight: 700,
        textTransform: 'uppercase',
    },
}));

const icons = {
    user: IconUser,
    discount: IconDiscount2,
    receipt: IconReceipt2,
    coin: IconCoin,
    post: IconArticle,
    comment: IconArchive,
    view: IconEye,
};


export default function StatsCards() {

    const {classes} = useStyles();
    const {stat, isLoading, error} = useStatCounts()
    if (error) {
        return (
            <Skeleton height={100} width={'full'} radius="md" animate={true}/>
        )
    }
    if (isLoading) {
        return (
            <Skeleton height={100} width={'full'} radius="md" animate={true}/>
        )
    }
    const data = [
        {title: '文章', icon: 'post', value: stat.data.post_count, diff: -14},
        {title: '评论', icon: 'comment', value: stat.data.comment_count, diff: -14},
        {title: '用户', icon: 'user', value: stat.data.user_count, diff: 14},
        {title: '访问', icon: 'view', value: stat.data.total_viewed, diff: -14},]

    const stats = data.map((stat) => {
        // @ts-ignore
        const Icon = icons[stat.icon];
        return (
            <Paper shadow={'xs'} withBorder p="md" radius="md" key={stat.title}>
                <Group position="apart">
                    <Text size="xs" color="dimmed" className={classes.title}>
                        {stat.title}
                    </Text>
                    <Icon className={classes.icon} size="1.4rem" stroke={1.5}/>
                </Group>

                <Group align="flex-end" spacing="xs" mt={25}>
                    <Text className={classes.value}>{stat.value}</Text>
                </Group>

                <Text fz="xs" c="dimmed" mt={7}>
                    总数
                </Text>
            </Paper>
        );
    });

    return (
        <Container mb={'xl'}>
            <SimpleGrid
                cols={4}
                breakpoints={[
                    {maxWidth: 'md', cols: 2},
                    {maxWidth: 'xs', cols: 1},
                ]}
            >
                {stats}
            </SimpleGrid>
        </Container>
    );
}