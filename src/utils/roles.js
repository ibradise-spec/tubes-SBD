export const ROLES = {
  OWNER: 'owner',
  CS_MANAGER: 'cs_manager',
  LOGISTICS_MANAGER: 'logistics_manager',
  VIEWER: 'viewer'
};

export const ROLE_PERMISSIONS = {
  owner: ['all'],
  cs_manager: ['view', 'create', 'update'],
  logistics_manager: ['view', 'create', 'update', 'delete'],
  viewer: ['view']
};