import { SetMetadata } from '@nestjs/common';

enum Role {
  candidate = 'candidate',
  recruiter = 'recruiter',
}

const ROLES_KEY = 'roles';
const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export { Role, ROLES_KEY, Roles };
