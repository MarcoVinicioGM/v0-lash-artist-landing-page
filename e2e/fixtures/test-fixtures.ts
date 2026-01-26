import { test as base, expect } from "@playwright/test";

/**
 * Custom Test Fixture
 */
type TestFixtures = {};

export const test = base.extend<TestFixtures>({});

export { expect };
