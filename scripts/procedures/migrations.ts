import { compat, types as T } from "../deps.ts";

export const migration: T.ExpectedExports.migration = compat.migrations
    .fromMapping({}, "0.37.1.0" );
