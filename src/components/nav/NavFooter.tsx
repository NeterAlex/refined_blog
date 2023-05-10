import {ActionIcon, Container, createStyles, Group, rem, Text, Tooltip} from '@mantine/core';
import {IconCreativeCommons} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: rem(100),
        paddingTop: `calc(${theme.spacing.xl})`,
        paddingBottom: `calc(${theme.spacing.xl})`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },

    link: {
        display: 'block',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        fontSize: theme.fontSizes.sm,
        paddingTop: rem(3),
        paddingBottom: rem(3),

        '&:hover': {
            textDecoration: 'underline',
        },
    },

    afterFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
        },
    },
}));


export function NavFooter() {
    const {classes} = useStyles();
    return (
        <footer className={classes.footer}>
            <Container className={classes.afterFooter}>
                <Text color="dimmed" size="sm">
                    Powered by Refined. ©2023 NeterAlex, All rights reserved.
                </Text>
                <Group>
                    <a className={classes.link} href={"https://beian.miit.gov.cn/"}>
                        黑ICP备2023004156号-1
                    </a>
                    <Tooltip label="本站内容遵循CC BY-NC-SA 4.0协议">
                        <ActionIcon component={'a'} href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target={'_blank'}>
                            <IconCreativeCommons/>
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Container>
        </footer>
    );
}