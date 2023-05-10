import {Page} from "@/common/types";
import {UserList} from "@/components/admin/UserList";

const userPage: Page = () => {
    return (
        <>
            <UserList/>
        </>
    )
}
export default userPage
userPage.Layout = 'Admin'