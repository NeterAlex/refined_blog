import AdminLayout from "@/layout/AdminLayout";
import MainLayout from "@/layout/MainLayout";

export const Layouts = {
    Main: MainLayout,
    Admin: AdminLayout,
}
export type LayoutKeys = keyof typeof Layouts