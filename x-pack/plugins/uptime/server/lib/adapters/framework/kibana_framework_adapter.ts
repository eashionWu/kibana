/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { Server } from '@hapi/hapi';
import { GraphQLSchema } from 'graphql';
import {
  UMBackendFrameworkAdapter,
  UMFrameworkRequest,
  UMFrameworkResponse,
  UMFrameworkRouteOptions,
  UMHapiGraphQLPluginOptions,
} from './adapter_types';
import { uptimeGraphQLHapiPlugin } from './apollo_framework_adapter';

export class UMKibanaBackendFrameworkAdapter implements UMBackendFrameworkAdapter {
  private server: Server;

  constructor(hapiServer: Server) {
    this.server = hapiServer;
  }

  public registerRoute<
    RouteRequest extends UMFrameworkRequest,
    RouteResponse extends UMFrameworkResponse
  >(route: UMFrameworkRouteOptions<RouteRequest, RouteResponse>) {
    this.server.route(route);
  }

  public registerGraphQLEndpoint(routePath: string, schema: GraphQLSchema): void {
    this.server.register<UMHapiGraphQLPluginOptions>({
      options: {
        graphQLOptions: (req: any) => ({
          context: { req },
          schema,
        }),
        path: routePath,
      },
      plugin: uptimeGraphQLHapiPlugin,
    });
  }
}
