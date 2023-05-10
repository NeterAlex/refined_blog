import {Avatar, Card, createStyles, Group, Progress, rem, Text} from '@mantine/core';
import {useStatCounts} from "@/hooks/Request";
import MdEditor from "md-editor-rt";
import 'md-editor-rt/lib/style.css';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    avatar: {
        border: `${rem(2)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
}));

interface UserCardImageProps {
    image: string;
    avatar: string;
    name: string;
    job: string;
}


export function AboutCard({image, avatar, name, job}: UserCardImageProps) {
    const {classes, theme} = useStyles();
    const editorId = 'about'
    const data =
        '## 关于我\n' +
        '你好，这里是 NeterAlex，你可以叫我 Neter。\n' +
        '计算机相关专业在读大学生。\n' +
        '目前正在学习 `Golang` 和 `React`，有关折腾出来的东西，可以到我的 [Github](https://github.com/NeterAlex) 主页查看。\n' +
        '另外，我还比较喜欢研究音乐。\n' +
        '音乐口味比较偏向古典，会演奏二胡和钢琴，偏爱弦乐器。\n' +
        '除此之外，我还是一个JRPG爱好者，\n' +
        '欢迎一起交流。\n' +
        '## 关于本站\n' +
        '本站由`Go + Hertz`，`Next.js + React`共同构建，\n' +
        '目前部署在阿里云上，\n' +
        '还在不断迭代更新。' +
        '\n' +
        '## 如何联系我\n' +
        '邮件：`neteralex@foxmail.com`\n' +
        'Github：[Github](https://github.com/NeterAlex)'
    const {stat, isLoading, error} = useStatCounts()
    if (isLoading || error) {
        return <Progress></Progress>
    }
    const stats = [
        {label: '文章', value: stat.stat.post_count},
        {label: '用户', value: stat.stat.user_count},
        {label: '浏览量', value: stat.stat.total_viewed},
    ]
    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text ta="center" fz="lg" fw={500}>
                {stat.value}
            </Text>
            <Text ta="center" fz="sm" c="dimmed">
                {stat.label}
            </Text>
        </div>
    ));

    return (
        <Card shadow={'sm'} withBorder padding="xl" radius="md" className={classes.card}>
            <Card.Section sx={{backgroundImage: `url(${image})`, height: 120}}/>
            <Group position={'apart'} mb={20}>
                <Group>
                    <Avatar src={avatar} size={80} radius={80} ml={30} mt={-30} className={classes.avatar}/>
                </Group>
                <Group>
                    <Group mt="md" position="center" spacing={30}>
                        {items}
                    </Group>
                </Group>
            </Group>
            <MdEditor editorId={editorId} theme={theme.colorScheme} modelValue={data} previewOnly={true} previewTheme={"github"}/>
        </Card>
    );
}