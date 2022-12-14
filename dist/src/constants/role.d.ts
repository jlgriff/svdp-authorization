export declare enum AccessLevel {
    READER = "reader",
    CONTRIBUTOR = "contributor",
    APPROVER = "approver",
    ADMINISTRATOR = "administrator",
    SYSTEM = "system",
    SYSTEM_ADMINISTRATOR = "system_administrator"
}
export interface AccessLevelEncoding {
    access: AccessLevel;
    tokenCode: Uint8Array;
    label: string;
}
export interface Role {
    userId: string;
    organizationId: string;
    access: AccessLevel;
}
export declare const ACCESS_LEVEL_MAPPINGS: AccessLevelEncoding[];
//# sourceMappingURL=role.d.ts.map