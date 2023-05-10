import {Badge, Card, createStyles, Group, Image, rem, Text,} from '@mantine/core';
import {useRouter} from "next/router";
import {useViewIncrease} from "@/hooks/Request";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    footer: {
        padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },
}));

interface Props {
    id: number
    image: string
    tags: string
    title: string
    date: string
    viewed: number
}

export function PostCard({id, image, tags, title, date, viewed}: Props) {
    const {classes} = useStyles()
    const router = useRouter()
    const {trigViewIncrease} = useViewIncrease(String(id))
    return (
        <Card withBorder padding="lg" shadow="xs" component="a" href="#!" radius="md" className={classes.card} onClick={async (e) => {
            e.preventDefault()
            await trigViewIncrease()
            router.push(`/post/${id}`)
        }}>
            <Card.Section mb="sm">
                <Image src={image} alt={title} height={180}/>
            </Card.Section>
            <Text fw={700} size="md">
                {title}
            </Text>
            <Card.Section className={classes.footer}>
                <Group position="apart">
                    <Text fz="xs" c="dimmed">
                        {date}
                    </Text>

                    <Group position={"left"} spacing={rem(2)}>
                        {
                            tags.split(',').map((tag, id) => (<Badge radius="md" key={id + 1}>{tag}</Badge>))
                        }
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    )
}