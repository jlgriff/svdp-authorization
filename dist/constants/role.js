export var AccessLevel;
(function (AccessLevel) {
    AccessLevel["READER"] = "reader";
    AccessLevel["CONTRIBUTOR"] = "contributor";
    AccessLevel["APPROVER"] = "approver";
    AccessLevel["ADMINISTRATOR"] = "administrator";
    AccessLevel["SYSTEM"] = "system";
    AccessLevel["SYSTEM_ADMINISTRATOR"] = "system_administrator";
})(AccessLevel || (AccessLevel = {}));
export var OrganizationType;
(function (OrganizationType) {
    OrganizationType["CONFERENCE"] = "conference";
    OrganizationType["COUNCIL"] = "council";
})(OrganizationType || (OrganizationType = {}));
export const ACCESS_LEVEL_MAPPINGS = [
    { access: AccessLevel.READER, tokenCode: new Uint8Array([10]), label: AccessLevel.READER.toString() },
    { access: AccessLevel.CONTRIBUTOR, tokenCode: new Uint8Array([20]), label: AccessLevel.CONTRIBUTOR.toString() },
    { access: AccessLevel.APPROVER, tokenCode: new Uint8Array([30]), label: AccessLevel.APPROVER.toString() },
    { access: AccessLevel.ADMINISTRATOR, tokenCode: new Uint8Array([40]), label: AccessLevel.ADMINISTRATOR.toString() },
    { access: AccessLevel.SYSTEM, tokenCode: new Uint8Array([200]), label: AccessLevel.ADMINISTRATOR.toString() },
    { access: AccessLevel.SYSTEM_ADMINISTRATOR, tokenCode: new Uint8Array([210]), label: AccessLevel.ADMINISTRATOR.toString() },
];
export const ORGANIZATION_TYPE_MAPPINGS = [
    { type: OrganizationType.CONFERENCE, tokenCode: new Uint8Array([10]), label: OrganizationType.CONFERENCE.toString() },
    { type: OrganizationType.COUNCIL, tokenCode: new Uint8Array([20]), label: OrganizationType.COUNCIL.toString() },
];
