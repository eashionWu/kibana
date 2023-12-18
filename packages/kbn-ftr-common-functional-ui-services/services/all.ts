/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { RetryOnStaleProvider } from './retry_on_stale';
import { FindProvider } from './find';
import { TestSubjects } from './test_subjects';
import { RemoteProvider } from './remote';

export const services = {
  retryOnStale: RetryOnStaleProvider,
  find: FindProvider,
  testSubjects: TestSubjects,
  __webdriver__: RemoteProvider,
};
