import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { inject } from '@angular/core';
import { Permissions } from '../model/Permissions';

export const userGuard: CanActivateFn = (route, state) => {
  const permissions = inject(StorageService).getUser()?.permissions
  const router = inject(Router)

  if (!permissions) {
    router.navigate(['/'])
    return false
  }

  const hasReadPermissions = permissions.indexOf(Permissions.READ_USERS) !== -1
  const hasMutatingPermissions =
    permissions.indexOf(Permissions.CREATE_USERS) !== -1 || permissions.indexOf(Permissions.UPDATE_USERS) !== -1 || permissions.indexOf(Permissions.DELETE_USERS) !== -1

  if (hasReadPermissions && hasMutatingPermissions) {
    return true
  }

  router.navigate(['/'])
  return false
};
