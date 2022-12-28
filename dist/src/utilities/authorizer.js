import { AccessLevel, ACCESS_LEVEL_MAPPINGS } from '../constants/role.js';
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
export const encodeRoles = (roles) => roles.map((role) => {
    const { organizationId } = role;
    const accessLevel = encodeAccessLevel(role.access);
    return `${organizationId}:${accessLevel}`;
});
/**
 * Decodes a string from the JWT into a list of user roles
 *
 * @param encodedRoles - encoded string that contains all of the user's roles within his organizations
 * @param userId - user's ID
 * @returns a list of a user's roles within his organizations
 */
export const decodeRoles = (encodedRoles, userId) => {
    const roles = [];
    encodedRoles.forEach((encodedRole) => {
        const encodedValues = encodedRole.split(':');
        try {
            const organizationId = encodedValues[0];
            const AccessLevelCode = Number(encodedValues[1]);
            const access = decodeAccessLevel(Uint8Array.from([AccessLevelCode]));
            if (access) {
                roles.push({
                    organizationId, userId, access,
                });
            }
        }
        catch (e) {
            throw new Error('Failed to read user\'s role permissions', { cause: `Failed to decode a user role on the following encoded role string: ${JSON.stringify(encodedRole)}` });
        }
    });
    return roles;
};
/**
 * Determines if any of the user's roles in a particular organization are authorized
 *
 * @param accessChecks - array of access-level checks that will authorize the user if *any* return true
 * @param organizationId - id of the organization to check for user's access
 * @param organizationType - type of organization to check for user's access
 * @param userRoles - user's roles from their JWT token
 * @returns whether the user is authorized
 */
export const isAuthorized = (accessChecks, organizationId, userRoles) => accessChecks.some((fn) => fn(organizationId, userRoles) === true);
/**
 * Determines whether the user has reader access in the given organization
 *
 * @param organizationId - id of the organization to check for user's access
 * @param organizationType - type of organization to check for user's access
 * @param userRoles - user's roles from their JWT token
 * @returns whether the user has reader access in the given organization
 */
export const hasReaderAccess = (organizationId, userRoles) => userRoles
    .filter((role) => role.organizationId === organizationId && role.access === AccessLevel.READER)
    .length > 0;
/**
* Determines whether the user has contributor access in the given organization
*
* @param organizationId - id of the organization to check for user's access
* @param organizationType - type of organization to check for user's access
* @param userRoles - user's roles from their JWT token
* @returns whether the user has contributor access in the given organization
*/
export const hasContributorAccess = (organizationId, userRoles) => userRoles
    .filter((role) => role.organizationId === organizationId && role.access === AccessLevel.CONTRIBUTOR)
    .length > 0;
/**
* Determines whether the user has approver access in the given organization
*
* @param organizationId - id of the organization to check for user's access
* @param organizationType - type of organization to check for user's access
* @param userRoles - user's roles from their JWT token
* @returns whether the user has approver access in the given organization
*/
export const hasApproverAccess = (organizationId, userRoles) => userRoles
    .filter((role) => role.organizationId === organizationId && role.access === AccessLevel.APPROVER)
    .length > 0;
/**
* Determines whether the user has administrator access in the given organization
*
* @param organizationId - id of the organization to check for user's access
* @param organizationType - type of organization to check for user's access
* @param userRoles - user's roles from their JWT token
* @returns whether the user has administrator access in the given organization
*/
export const hasAdministratorAccess = (organizationId, userRoles) => userRoles
    .filter((role) => role.organizationId === organizationId && role.access === AccessLevel.ADMINISTRATOR)
    .length > 0;
/**
* Determines whether the user has system access in the given organization
*
* @param organizationId - id of the organization to check for user's access
* @param organizationType - type of organization to check for user's access
* @param userRoles - user's roles from their JWT token
* @returns whether the user has system access in the given organization
*/
export const hasSystemAccess = (organizationId, userRoles) => userRoles
    .filter((role) => role.organizationId === organizationId && role.access === AccessLevel.SYSTEM)
    .length > 0;
/**
* Determines whether the user has system administrator access in the given organization
*
* @param organizationId - id of the organization to check for user's access
* @param organizationType - type of organization to check for user's access
* @param userRoles - user's roles from their JWT token
* @returns whether the user has system administrator access in the given organization
*/
export const hasSystemAdministratorAccess = (organizationId, userRoles) => userRoles
    .filter((role) => role.organizationId === organizationId && role.access === AccessLevel.SYSTEM_ADMINISTRATOR)
    .length > 0;
//# sourceMappingURL=authorizer.js.map