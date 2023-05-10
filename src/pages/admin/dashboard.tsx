import {Page} from "@/common/types";
import {Container} from "@mantine/core";
import StatsCards from "@/components/admin/StatCard";
import {PostListCard} from "@/components/admin/PostListCard";


const DashboardPage: Page = () => {
    return (
        <Container my="md">
            <StatsCards/>
            <PostListCard/>
        </Container>
    )
}
export default DashboardPage
DashboardPage.Layout = 'Admin'