import { AccessLevel, OrganizationType } from '../constants/role.js';
export interface Role {
    userId: string;
    organizationId: number;
    organizationType: OrganizationType;
    access: AccessLevel;
}
//# sourceMappingURL=role.d.ts.map