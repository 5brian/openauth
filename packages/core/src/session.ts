import { v1 } from "@standard-schema/spec";
import { jwtVerify, JSONWebKeySet, createLocalJWKSet } from "jose";
import process from "node:process";

export type SubjectSchema = {
  [key: string]: v1.StandardSchema;
};

export type SubjectPayload<T extends SubjectSchema> = {
  [type in keyof T]: {
    type: type;
    properties: v1.InferOutput<T[type]>;
  };
}[keyof T];

export function createSubjects<Schema extends SubjectSchema = {}>(
  types: Schema,
) {
  return {
    ...types,
    public: {
      "~standard": {
        vendor: "sst",
        version: 1,
        validate() {
          return {
            value: {},
            issues: [],
          };
        },
      },
    },
  } as Schema & {
    public: v1.StandardSchema<{}, {}>;
  };
}
