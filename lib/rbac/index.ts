// Role-Based Access Control (RBAC) Module
// Central export point for all RBAC utilities

export {
  type UserRole,
  type Permission,
  ROLE_LABELS,
  ROLE_HIERARCHY,
  getPermissionsForRole,
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  canEdit,
  canView,
  getVisibleModules,
  isAdmin,
  isTeacher,
  isStudent,
  isFamily,
  isPAS,
} from "./roles"

export { useRBAC, type UseRBACReturn } from "./useRBAC"

export {
  PermissionGuard,
  CanView,
  CanEdit,
  RoleBasedContent,
  AdminOnly,
  TeacherOnly,
  StudentOnly,
  Editable,
} from "./PermissionGuard"
