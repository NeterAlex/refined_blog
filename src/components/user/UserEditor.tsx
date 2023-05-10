import {isEmail, isNotEmpty, useForm} from "@mantine/form";
import {
    Avatar,
    Button,
    Card,
    Checkbox,
    Container,
    Divider,
    FileInput,
    Group,
    Image,
    Paper,
    PasswordInput,
    rem,
    SimpleGrid,
    Stack,
    Text,
    TextInput,
    useMantineTheme
} from "@mantine/core";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {IconInfoCircle, IconPencil, IconSettings, IconUpload} from "@tabler/icons-react";
import {useTokenUpdate} from "@/hooks/Request";
import FormData from "form-data";
import axios from "axios";
import {notifications} from "@mantine/notifications";
import {useAtom} from "jotai";
import {UserAtom} from "@/store/User";

interface Props {
    uid: string;
    nickname: string;
    email: string;
    username: string;
}

export default function UserEditor(props: Props) {
    const router = useRouter();
    const theme = useMantineTheme();
    const [file, setFile] = useState<File | null>(null);
    const [currentUser, setCurrentUser] = useAtom(UserAtom);
    const [confirm, setConfirm] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const form = useForm({
        initialValues: {nickname: props.nickname, email: props.email, password: "", username: props.username,},
        validate: {
            nickname: isNotEmpty("昵称不应为空"),
            email: isEmail("请输入正确的邮箱地址"),
        }
    });
    const {trigTokenUpdate} = useTokenUpdate(`/v1/user/update/${props.uid}`, form.values, {title: "用户信息更新成功", message: "将返回首页", color: "green"});
    return (
        <Container mt={"xl"}>
            <Card withBorder shadow="sm" mt={30} radius="md">
                <Card.Section mb="xl">
                    <Image src={"https://images.pexels.com/photos/1910225/pexels-photo-1910225.jpeg?auto=compress&cs=tinysrgb&w=1600"} alt={"bg"} height={120}/>
                </Card.Section>
                <Card.Section mb="md">
                    <Group pl="xl" position="apart">
                        <Group>
                            <Group spacing={4}>
                                <IconSettings size={rem(30)} stroke={"2"} color={theme.colors.blue[9]}/>
                                <Text fz="lg" c="dimmed">用户设置</Text>
                            </Group>
                        </Group>
                        <Group mr="md">
                        </Group>
                    </Group>
                </Card.Section>
                <Divider/>
                <SimpleGrid cols={2} spacing="md" breakpoints={[{maxWidth: "sm", cols: 1}]}>

                    <Paper withBorder p={30} mt={30} radius="md" component="form" onSubmit={form.onSubmit(async () => {
                        await trigTokenUpdate();
                        router.replace("/");
                    })}>
                        <TextInput disabled={true} value={props.username} label={"用户名"} placeholder={"显示名称"}/>
                        <TextInput mt="md" label={"昵称"} placeholder={"显示名称"} withAsterisk {...form.getInputProps("nickname")}/>
                        <TextInput mt="md" label={"电子邮件"} placeholder={"用于联系以及登陆账号"} withAsterisk {...form.getInputProps("email")}/>
                        <Divider my={30}></Divider>
                        <Checkbox mt="md" label="修改密码" checked={confirm} onChange={e => setConfirm(e.currentTarget.checked)}/>
                        <PasswordInput mt="md" disabled={!confirm} value={newPassword} onChange={e => setNewPassword(e.currentTarget.value)} label={"新密码"}
                                       placeholder={"新密码"}/>
                        <PasswordInput mt="md" disabled={!(confirm && newPassword !== "")} label={"确认新密码"} placeholder={"确认新密码"}
                                       withAsterisk {...form.getInputProps("password")}/>
                        <Button disabled={newPassword !== form.values.password} fullWidth mt="xl" type="submit">
                            修改
                        </Button>
                        
                    </Paper>

                    <Paper withBorder p={30} mt={30} radius="md" component="form" onSubmit={async () => {
                        if (typeof file === null) {
                            notifications.show({title: "未选择图像", message: "", color: "red"});
                            return;
                        } else { // @ts-ignore
                            if (file?.size > 2097152) {
                                notifications.show({title: "图像过大", message: "请选择小于2MB的图像文件", color: "red"});
                                return;
                            }
                        }
                        let formData = new FormData();
                        formData.append("file", file);
                        await axios.post(`/v1/file/avatar/${props.uid}`, formData, {
                                headers: {
                                    "Authorization": `Bearer ${currentUser.token}`
                                },
                                transformRequest: [function (data, headers) {
                                    headers.delete("Content-Type");
                                    return data;
                                }]
                            }
                        ).catch(() => {
                            notifications.show({title: "头像更新失败", message: "将返回首页", color: "red"});
                        }).then(() => {
                            notifications.show({title: "头像更新成功", message: "将返回首页", color: "green"});
                        });

                    }}>
                        <Group position={"apart"}>
                            <Stack>
                                <Avatar size={"xl"} src={`http://localhost:8022/static/avatar/${props.uid}.jpg`}></Avatar>
                            </Stack>
                            <Group>
                                <Text c={"dimmed"}>{props.nickname}</Text>
                                <IconPencil color={"#878e95"}/>
                            </Group>

                        </Group>
                        <Divider my={35}/>
                        <FileInput icon={<IconUpload size={rem(14)}/>} placeholder="选择图像文件" value={file} onChange={setFile} accept="image/png,image/jpeg" label="头像"/>
                        <Group my={10} position={"apart"}>
                            <IconInfoCircle size={17} color={"#ed8537"}/>
                            <Text c={"orange"} size={"sm"}>由于缓存，头像修改后可能暂时不会刷新</Text>
                        </Group>
                        <Button fullWidth mb="xl" type="submit">
                            上传并修改
                        </Button>
                    </Paper>
                </SimpleGrid>

            </Card>

        </Container>
    );
}