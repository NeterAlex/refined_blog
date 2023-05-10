import NavHeader from "@/components/nav/NavHeader";
import {NavFooter} from "@/components/nav/NavFooter";
import {Box} from "@mantine/core";
import TopBack from "@/components/nav/BackToTop";


export default function MainLayout({children}: any) {
    return (
        <Box mih={'100vh'}>
            <NavHeader/>
            <Box>
                {children}
            </Box>
            <TopBack/>
            <NavFooter/>
        </Box>
    )
}