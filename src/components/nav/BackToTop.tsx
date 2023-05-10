import {IconArrowUp} from "@tabler/icons-react";
import {ActionIcon} from "@mantine/core";
import {useWindowScroll} from '@mantine/hooks';


export default function TopBack() {
    const [scroll, scrollTo] = useWindowScroll();
    return (
        scroll.y > 100 ?
            (
                <ActionIcon size={'lg'} variant='filled' color="gray" radius="xl" sx={{
                    position: 'fixed',
                    cursor: 'pointer',
                    right: '45px',
                    bottom: '45px',
                    zIndex: 99,
                }} onClick={() => scrollTo({y: 0})}>
                    <IconArrowUp size="1.125rem"/>
                </ActionIcon>
            )
            : (
                <>
                </>
            )

    )
}