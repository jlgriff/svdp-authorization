import { AccessLevelEncoding, OrganizationTypeEncoding } from '../interfaces/encoding.js';
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
export declare const ACCESS_LEVEL_MAPPINGS: AccessLevelEncoding[];
export declare const ORGANIZATION_TYPE_MAPPINGS: OrganizationTypeEncoding[];
