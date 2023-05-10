import {Box, Button, Flex, rem, Title} from "@mantine/core";
import {IconArrowRight} from "@tabler/icons-react";
import {useRouter} from "next/router";

interface Props {
    title: string
    height: string
    link: string
}

export default function Banner({title, height, link}: Props) {
    const router = useRouter()
    return (
        <Box my={rem(30)}>
            <Flex align={'center'} h={height} justify={'space-between'}>
                <Title order={2} sx={{}}>{title}</Title>
                <Button rightIcon={<IconArrowRight/>} variant="subtle" size="md" onClick={() => router.push(link)}>
                    More
                </Button>
            </Flex>
        </Box>
    )
}