# ACTIVITY
## AUDIT LOGS
1. En el archivo `schema.prisma`:
   - creamos un enum para los actions
   - creamos un enum para los entity_types
   - creamos un modelo para los AuditLog
2. En la terminal ejecutamos:
   - npx prisma db push
   - npx prisma generate
3. Creamos un lib *createAuditLog* para crear audit logs ► `lib/create-audit-log.ts`
4. Usamos el *createAuditLog* al crear una card ► `actions/create-card/index.ts`
5. Creamos una api para obtener los auditLogs de las cards ► `app/api/cards/[cardId]/logs/route.ts`
6. Creamos el lib *generateLogMessage* para generar msj de las actividades ► `lib/generate-log-message.ts`
7. Instalamos date-fns ► npm i date-fns
8. Creamos el componente *Activity* para los cards ► `components/modal/card-modal/activity.tsx`
9. Creamos el componente *ActivityItem* ► `components/activity-item.tsx`
10. Usamos el *generateLogMessage* en el ActivityItem ► `components/activity-item.tsx`
11. Usamos el *ActivityItem* en el Activity ► `components/modal/card-modal/activity.tsx`
12. Hacemos el fetch de los auditLogs para mostrarlos en el *CardModal* ► `.../card-modal/index.tsx`
13. Usamos el *createAuditLog* para el resto de las acciones:
    - copiar una card ► `actions/copy-card/index.ts`
    - copiar una list ► `actions/copy-list/index.ts`
    - crear un board ► `actions/create-board/index.ts`
    - crear una list ► `actions/create-list/index.ts`
    - eliminar un board ► `actions/delete-board/index.ts`
    - eliminar un card ► `actions/delete-card/index.ts`
    - eliminar una list ► `actions/delete-list/index.ts`
    - actualizar un board ► `actions/update-board/index.ts`
    - actualizar una card ► `actions/update-card/index.ts`
    - actualizar una list ► `actions/update-list/index.ts`
14. Revalidamos los auditLogs al cambiar el nombre de la card ► `.../card-modal/header.tsx`
15. Revalidamos los auditLogs al cambiar la descripcion de la card ► `.../card-modal/description.tsx`
16. Creamos la page *ActivityPage* ► `.../(dashboard)/organization/[organizationId]/activity/page.tsx`
17. Creamos el componente *ActivityList* ► `.../[organizationId]/activity/_components/activity-list.tsx`
18. Usamos el *ActivityList* en el ActivityPage ► `.../organization/[organizationId]/activity/page.tsx`