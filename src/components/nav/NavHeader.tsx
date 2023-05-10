import React from 'react';
import {Burger, Container, createStyles, Group, Header, Menu, rem, useMantineTheme} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {useRouter} from "next/router";
import Image from 'next/image'
import UserMenu from "@/components/nav/UserMenu";
import SpotSearch from "@/components/nav/Spotlight";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: rem(56),
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

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor}).background,
            color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
        },
    },
}));


export default function NavHeader() {

    const links = [
        {link: '/post', label: '文章'},
        {link: '/archive', label: '归档'},
        {link: '/about', label: '关于'},
    ]

    const [opened, {toggle}] = useDisclosure(false)
    const {classes, cx} = useStyles()
    const router = useRouter()
    const theme = useMantineTheme()

    const items = links.map((link) => (
        <Link key={link.label} href={link.link} className={cx(classes.link)}>
            {link.label}
        </Link>
    ))

    const menuItems = links.map((link, index) => (
        <Menu.Item component={Link} href={link.link} key={index}>{link.label}</Menu.Item>
    ))

    return (
        <Header height={56}>
            <Container className={classes.inner}>
                <Menu shadow="md" opened={opened} onChange={toggle} width={200}>
                    <Menu.Target>
                        <Burger opened={opened} onClick={toggle} size="sm" className={classes.burger}/>
                    </Menu.Target>

                    <Menu.Dropdown>
                        {menuItems}
                    </Menu.Dropdown>
                </Menu>

                <Group className={classes.links} spacing={5}>
                    {items}
                </Group>
                <Image style={{cursor: 'pointer'}} onClick={() => router.push('/')} src={theme.colorScheme === "light" ? "/logo_light.svg" : "/logo_dark.svg"} width={70}
                       height={40}
                       alt={'logo'}></Image>
                <Group spacing={0} className={classes.social} position="right" noWrap>
                    <SpotSearch/>
                    <UserMenu/>
                </Group>
            </Container>
        </Header>
    );
}