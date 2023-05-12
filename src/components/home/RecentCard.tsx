import {Button, createStyles, Paper, rem, Skeleton, Text, Title} from '@mantine/core';
import {useRouter} from "next/router";
import {usePostLatest} from "@/hooks/Request";

const useStyles = createStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    title: {
        fontFamily: `${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.white,
        lineHeight: 1.2,
        fontSize: rem(32),
        marginTop: theme.spacing.xs,
    },

    category: {
        color: theme.white,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: 'uppercase',
    },
}));

interface Props {
    height: string;
}

export default function RecentCard({height}: Props) {
    const {classes} = useStyles();
    const {latest, isLoading, error} = usePostLatest()
    const router = useRouter()
    let appEnv = process.env.APP_ENV
    const globalBase = appEnv === 'production' ? 'https://api.neteralex.cn' : 'http://localhost:8022'
    if (isLoading) {
        return (
            <Skeleton w={"100%"} height={height} radius="md" animate={true}/>
        )
    }

    if (error) {
        return (
            <Skeleton w={"100%"} height={height} radius="md" animate={true}/>
        )
    }

    return (
        <Paper shadow="sm" p="xl" radius="md" sx={{backgroundImage: `url(${latest.post.image_url})`}} h={height} className={classes.card}>
            <div>
                <Text className={classes.category} size="xs">
                    LATEST
                </Text>
                <Title order={3} className={classes.title}>
                    {latest.post.title}
                </Title>
            </div>
            <Button variant="white" color="dark" onClick={() => {
                fetch(`${globalBase}/v1/post/view/${latest.post.id}`).then(res => res.json())
                router.push(`/post/${latest.post.id}`)
            }}>
                阅读
            </Button>
        </Paper>
    );
}