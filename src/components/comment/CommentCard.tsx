import {Avatar, Box, createStyles, Divider, Group, rem, Text} from '@mantine/core';


const useStyles = createStyles((theme) => ({
    body: {
        paddingLeft: rem(54),
        paddingTop: theme.spacing.sm,
    },
}));

interface Props {
    uid: string
    postedAt: string
    body: string
    author: string
    image: string
}

export function CommentCard({uid, postedAt, body, author, image}: Props) {
    const {classes} = useStyles();
    return (
        <>
            <Box px={'md'}>
                <Group mt="md">
                    <Avatar src={image} alt={author} radius="md"/>
                    <div>
                        <Text size="lg">{author}</Text>
                        <Text size="sm" color="dimmed">
                            {postedAt}
                        </Text>
                    </div>
                </Group>
                <Text className={classes.body} size="md" mb="md">
                    {body}
                </Text>
            </Box>
            <Divider/>
        </>
    );
}