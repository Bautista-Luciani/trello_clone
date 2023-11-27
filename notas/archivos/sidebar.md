# SIDEBAR
1. Creamos el *OrganizationLayout* ► `app/(platform)/(dashboard)/organization/layout.tsx`
2. Creamos el *OrganizationIdLayout* ► `../organization/[organizationId]/layout.tsx`
3. Creamos el componente *OrgControl* ► `../organization/[organizationId]/_components/org-control.tsx`
4. Usamos el OrgControl en el OrganizationIdLayout ► `../organization/[organizationId]/layout.tsx`
5. Instalamos usehook-ts ► npm i usehook-ts
6. Creamos el componente *Sidebar* ► `../(dashboard)/_components/sidebar.tsx`
7. Usamos el OrgControl en el OrganizationLayout ► `../organization/layout.tsx`
8. Cremos el componente *NavItem* ► `../(dashboard)/_components/nav-item.tsx`
9. Usamos el componente NavItem en el Sidebar ► `../(dashboard)/_components/sidebar.tsx`
10. Instalamos zustand ► npm i zustand
11. Creamos el hook *useModalSidebar* ► `hooks/use-modal-sidebar.ts`
12. Cremos el componente *MobileSidebar* ► `../(dashboard)/_components/mobile-sidebar.tsx`
13. Usamos el componente MobileSidebar en el Navbar ► `../(dashboard)/_components/navbar.tsx`
14. Creamos el SettingsPage ► `../organization/[organizationId]/settings/page.tsx`
