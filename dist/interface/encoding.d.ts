import { AccessLevel, OrganizationType } from './role.js';
export interface OrganizationTypeEncoding {
    type: OrganizationType;
    tokenCode: Uint8Array;
    label: string;
}
export interface AccessLevelEncoding {
    access: AccessLevel;
    tokenCode: Uint8Array;
    label: string;
}
