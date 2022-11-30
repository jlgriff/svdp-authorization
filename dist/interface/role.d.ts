export declare enum AccessLevel {
    READER = "reader",
    CONTRIBUTOR = "contributor",
    APPROVER = "approver",
    ADMINISTRATOR = "administrator"
}
export declare enum OrganizationType {
    CONFERENCE = "conference",
    COUNCIL = "council"
}
export interface Role {
    userId: string;
    organizationId: number;
    organizationType: OrganizationType;
    access: AccessLevel;
}
