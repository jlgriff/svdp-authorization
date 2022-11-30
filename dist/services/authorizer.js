import { ACCESS_LEVEL_MAPPINGS, ORGANIZATION_TYPE_MAPPINGS, } from '../constants/role.js';
/**
 * Encodes the organization type enum into a single byte
 *
 * @param organizationType - type of organization
 * @returns a single byte representing the organization type
 */
const encodeOrganizationType = (organizationType) => {
    const organizationTypeCodes = ORGANIZATION_TYPE_MAPPINGS
        .filter((mapping) => mapping.label.toLowerCase() === organizationType.toLowerCase())
        .map((mapping) => mapping.tokenCode);
    return organizationTypeCodes[0] || new Uint8Array([0]);
};
/**
 * Decodes the given byte code from the token into the corresponding organization type
 *
 * @param tokenCode - encoded byte for a given organization type
 * @returns an OrganizationType enum
 */
const decodeOrganizationType = (tokenCode) => {
    const organizationTypes = ORGANIZATION_TYPE_MAPPINGS
        .filter((mapping) => mapping.tokenCode[0] === tokenCode[0])
        .map((mapping) => mapping.type);
    return organizationTypes[0] || null;
};
/**
 * Encodes the given access level enum into a single byte
 *
 * @param accessLevel - user access level (in a given organization)
 * @returns a single byte representing the access level
 */
const encodeAccessLevel = (accessLevel) => {
    const roleTokenCodes = ACCESS_LEVEL_MAPPINGS
        .filter((mapping) => mapping.label.toLowerCase() === accessLevel.toLowerCase())
        .map((mapping) => mapping.tokenCode);
    return roleTokenCodes[0] || new Uint8Array([0]);
};
/**
 * Decodes the given byte code from the token into the corresponding user access level
 *
 * @param tokenCode - encoded byte for a given access level
 * @returns an AccessLevel enum
 */
const decodeAccessLevel = (tokenCode) => {
    const accessLevels = ACCESS_LEVEL_MAPPINGS
        .filter((mapping) => mapping.tokenCode[0] === tokenCode[0])
        .map((mapping) => mapping.access);
    return accessLevels[0] || null;
};
/**
 * Encodes a list of user roles into a single shortened string to better fit in JWT tokens
 *
 * @param roles - list of a user's roles within his organizations
 * @returns an encoded string containing all of a user's roles within his organizations
 */
export const encodeRoles = (roles) => {
    const encodedRoles = roles.map((role) => {
        const organizationType = encodeOrganizationType(role.organizationType);
        const { organizationId } = role;
        const accessLevel = encodeAccessLevel(role.access);
        return `${organizationType}:${organizationId}:${accessLevel}`;
    });
    return encodedRoles.join('|');
};
/**
 * Decodes a string from the JWT into a list of user roles
 *
 * @param encodedRoleString - encoded string that contains all of the user's roles within his organizations
 * @param userId - user's ID
 * @returns a list of a user's roles within his organizations
 */
export const decodeRoles = (encodedRoleString, userId) => {
    const encodedRoles = encodedRoleString.split('|');
    const roles = [];
    encodedRoles.forEach((encodedRole) => {
        const encodedValues = encodedRole.split(':');
        try {
            const organizationTypeCode = Number(encodedValues[0]);
            const organizationType = decodeOrganizationType(Uint8Array.from([organizationTypeCode]));
            const organizationId = Number(encodedValues[1]);
            const AccessLevelCode = Number(encodedValues[2]);
            const access = decodeAccessLevel(Uint8Array.from([AccessLevelCode]));
            if (organizationType && access) {
                roles.push({
                    organizationType, organizationId, userId, access,
                });
            }
        }
        catch (e) {
            throw new Error('Failed to read user\'s role permissions', { cause: `Failed to decode a user role on the following encoded role string: ${JSON.stringify(encodedRole)}` });
        }
    });
    return roles;
};
