import {ActionIcon, AppShell, createStyles, getStylesRef, Group, Header, Navbar, rem, useMantineColorScheme, useMantineTheme} from '@mantine/core';
import {IconArchive, IconArticle, IconDashboard, IconLogout, IconMoon, IconSun, IconSwitchHorizontal, IconUser} from "@tabler/icons-react";
import React, {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";
import {useAtom} from "jotai";
import {UserAtom} from "@/store/User";

const useStyles = createStyles((theme) => ({
    header: {
        paddingBottom: theme.spacing.md,
        marginBottom: `calc(${theme.spacing.md} * 1.5)`,
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,

            [`& .${getStylesRef('icon')}`]: {
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },
    },

    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor}).background,
            color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
            [`& .${getStylesRef('icon')}`]: {
                color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
            },
        },
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: `${theme.spacing.xl}`,
        paddingRight: `${theme.spacing.xl}`,
        height: rem(60),
        [theme.fn.smallerThan('sm')]: {
            justifyContent: 'flex-start',
        },
    },

    links: {
        width: rem(260),

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    social: {
        width: rem(260),

        [theme.fn.smallerThan('sm')]: {
            width: 'auto',
            marginLeft: 'auto',
        },
    },

    burger: {
        marginRight: theme.spacing.md,

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

}));

const data = [
    {link: '/admin/dashboard', label: '概览', icon: IconDashboard},
    {link: '/admin/post', label: '文章管理', icon: IconArticle},
    {link: '/admin/comment', label: '评论管理', icon: IconArchive},
    {link: '/admin/user', label: '用户管理', icon: IconUser},
];

const NavSidebar = ({children}: any) => {
    const {classes, cx} = useStyles();
    const [active, setActive] = useState('概览');
    const router = useRouter()
    const [currentUser, setCurrentUser] = useAtom(UserAtom)
    const {colorScheme, toggleColorScheme} = useMantineColorScheme()
    const theme = useMantineTheme()

    const NavMenu = (
        <>
            <Navbar height={'full'} width={{sm: 250}} p="md">
                <Navbar.Section grow>
                    {data.map((item) => (
                        <Link
                            className={cx(classes.link, {[classes.linkActive]: item.label === active})}
                            href={item.link}
                            key={item.label}
                            onClick={(event) => {
                                event.preventDefault();
                                setActive(item.label);
                                router.push(item.link)
                            }}
                        >
                            <item.icon className={classes.linkIcon} stroke={1.5}/>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </Navbar.Section>

                <Navbar.Section className={classes.footer}>
                    <Link href="/" className={classes.link}>
                        <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5}/>
                        <span>返回主站</span>
                    </Link>

                    <a href="#" className={classes.link} onClick={async (event) => {
                        event.preventDefault()
                        setCurrentUser({username: 'guest', status: 'guest', uid: '0', token: ''})
                        await router.replace('/')
                    }}>
                        <IconLogout className={classes.linkIcon} stroke={1.5}/>
                        <span>退出登录</span>
                    </a>
                </Navbar.Section>
            </Navbar>
        </>
    )

    const NavHeader = (
        <>
            <Header height={60}>
                <div className={classes.inner}>
                    <Image style={{cursor: 'pointer'}} onClick={() => router.push('/')} src={theme.colorScheme === "light" ? "/logo_light.svg" : "/logo_dark.svg"} width={70}
                           height={40}
                           alt={'logo'}></Image>
                    <Group spacing={0} className={classes.social} position="right" noWrap>
                        <ActionIcon size='sm' onClick={() => toggleColorScheme()}>
                            {colorScheme === 'light' ? <IconMoon size={18}/> : <IconSun size={18}/>}
                        </ActionIcon>

                    </Group>
                </div>
            </Header>
        </>
    )


    return (
        <AppShell
            padding="md"
            navbar={<Navbar width={{base: 200}} height={"full"} p="xs">{NavMenu}</Navbar>}
            header={<Header height={60} p="xs">{NavHeader}</Header>}
            styles={(theme) => ({
                main: {backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]},
            })}
        >
            {children}
        </AppShell>
    );
}

export default NavSidebar