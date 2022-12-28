import { ACCESS_LEVEL_MAPPINGS } from '../constants/role.js';
/**
 * Returns the AccessLevel enum with the same label as the given string
 *
 * @param access - string to match with an AccessLevel's label
 * @returns an AccessLevel enum
 */
export const getAccessLevelEnum = (access) => ACCESS_LEVEL_MAPPINGS
    .find((mapping) => access.toLowerCase() === mapping.label.toLowerCase())
    ?.access;
export default getAccessLevelEnum;
//# sourceMappingURL=enum-converter.js.map