export declare enum AccessLevel {
    READER = "reader",
    CONTRIBUTOR = "contributor",
    APPROVER = "approver",
    ADMINISTRATOR = "administrator",
    SYSTEM = "system",
    SYSTEM_ADMINISTRATOR = "system_administrator"
}
export declare enum OrganizationType {
    CONFERENCE = "conference",
    COUNCIL = "council"
}
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
export interface Role {
    userId: string;
    organizationId: number;
    organizationType: OrganizationType;
    access: AccessLevel;
}
export declare const ACCESS_LEVEL_MAPPINGS: AccessLevelEncoding[];
export declare const ORGANIZATION_TYPE_MAPPINGS: OrganizationTypeEncoding[];
//# sourceMappingURL=role.d.ts.map