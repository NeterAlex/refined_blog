import {ActionIcon, Anchor, Group, rem, Text} from '@mantine/core';
import type {SpotlightAction} from '@mantine/spotlight';
import {SpotlightProvider, useSpotlight} from '@mantine/spotlight';
import {IconArticle, IconHome, IconSearch} from '@tabler/icons-react';
import React from "react";
import {useAllPosts} from "@/hooks/Request";
import {useRouter} from "next/router";

function SpotController() {
    const spotlight = useSpotlight()
    return (
        <ActionIcon onClick={() => spotlight.openSpotlight()} mr="sm" size="lg">
            <IconSearch size="1.1rem" stroke={1.5}/>
        </ActionIcon>
    )
}

function ActionsWrapper({children}: { children: React.ReactNode }) {
    return (
        <div>
            {children}
            <Group
                position="apart"
                px={15}
                py="xs"
                sx={(theme) => ({
                    borderTop: `${rem(1)} solid ${
                        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                    }`,
                })}
            >
                <Text size="xs" color="dimmed">
                    搜索标题、时间、Tags
                </Text>
                <Anchor size="xs" href="#">
                    @NeterAlex
                </Anchor>
            </Group>
        </div>
    )
}

export default function SpotSearch() {
    const {posts, isLoading, error} = useAllPosts()
    const router = useRouter()
    const baseActions: SpotlightAction[] = [
        {
            title: '首页',
            description: '回到首页',
            group: '功能',
            onTrigger: () => router.push('/'),
            icon: <IconHome size="1.2rem"/>,
        },
    ]
    if (isLoading || error) {
        return (<></>)
    }

    const extraActions: SpotlightAction[] = posts.posts.map((post: any, index: any) => ({
        title: `${post.title}`,
        group: '文章',
        description: `${post.tags} · ${post.date} · ${post.viewed} reads`,
        onTrigger: () => router.push(`/post/${post.id}`),
        icon: <IconArticle size="1.2rem"/>,
    }))

    return (
        <SpotlightProvider
            actions={baseActions.concat(extraActions)}
            searchIcon={<IconSearch size="1.2rem"/>}
            searchPlaceholder="搜索..."
            limit={4}
            actionsWrapperComponent={ActionsWrapper}
            shortcut="/"
            nothingFoundMessage="Nothing found..."
        >
            <SpotController/>
        </SpotlightProvider>
    )
}