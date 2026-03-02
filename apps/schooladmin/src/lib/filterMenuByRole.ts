import { MenuItem } from "@/modules/shared/menu";
import { roleRoutes } from "@/modules/shared/config/roleRoutes";
import { Role } from "@/modules/shared/config/roles";

export function filterMenuByRole(
    items: MenuItem[],
    role: Role
): MenuItem[] {
    const allowedRoutes = roleRoutes[role] || [];

    return items
        .map((item) => {
            // If parent has children → filter recursively
            if (item.children && item.children.length > 0) {
                const filteredChildren = filterMenuByRole(
                    item.children,
                    role
                );

                if (filteredChildren.length === 0) {
                    return null;
                }

                return {
                    ...item,
                    children: filteredChildren,
                };
            }

            // Leaf node → check path
            if (item.path && allowedRoutes.includes(item.path)) {
                return item;
            }

            return null;
        })
        .filter(Boolean) as MenuItem[];
}
