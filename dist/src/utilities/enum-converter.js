import { ACCESS_LEVEL_MAPPINGS, ORGANIZATION_TYPE_MAPPINGS, } from '../constants/role.js';
/**
 * Returns the AccessLevel enum with the same label as the given string
 *
 * @param access - string to match with an AccessLevel's label
 * @returns an AccessLevel enum
 */
export const getAccessLevelEnum = (access) => ACCESS_LEVEL_MAPPINGS
    .find((mapping) => access.toLowerCase() === mapping.label.toLowerCase())
    ?.access;
/**
 * Returns the OrganizationType enum with the same label as the given string
 *
 * @param organizationType - string to match with an OrganizationType's label
 * @returns an OrganizationType enum
 */
export const getOrganizationTypeEnum = (organizationType) => ORGANIZATION_TYPE_MAPPINGS
    .find((mapping) => organizationType.toLowerCase() === mapping.label.toLowerCase())
    ?.type;
//# sourceMappingURL=enum-converter.js.map