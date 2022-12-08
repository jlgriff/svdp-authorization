import * as assert from 'assert/strict';
import { test } from 'mocha';
import { getAccessLevelEnum, getOrganizationTypeEnum } from '../../src/utilities/enum-converter.js';
import { AccessLevel, OrganizationType } from '../../src/constants/role.js';

describe('Test getAccessLevelEnum', () => {
  test('A string that matches an AccessLevel enum will return that AccessLevel', () => {
    const access = AccessLevel.READER;
    assert.equal(getAccessLevelEnum(AccessLevel.READER.toString()), access);
  });

  test('A string that matches an AccessLevel enum but with mismatched casing will return that AccessLevel', () => {
    const access = AccessLevel.READER;
    assert.equal(getAccessLevelEnum(AccessLevel.READER.toUpperCase()), access);
  });

  test('A string that does not match an AccessLevel enum will return undefined', () => {
    assert.equal(getAccessLevelEnum('nonsense'), undefined);
  });
});

describe('Test getOrganizationTypeEnum', () => {
  test('A string that matches an OrganizationType enum will return that OrganizationType', () => {
    const orgType = OrganizationType.CONFERENCE;
    assert.equal(getOrganizationTypeEnum(orgType.toString()), orgType);
  });

  test('A string that matches an OrganizationType enum but with mismatched casing will return that OrganizationType', () => {
    const orgType = OrganizationType.CONFERENCE;
    assert.equal(getOrganizationTypeEnum(orgType.toUpperCase()), orgType);
  });

  test('A string that does not match an OrganizationType enum will return undefined', () => {
    assert.equal(getOrganizationTypeEnum('nonsense'), undefined);
  });
});
