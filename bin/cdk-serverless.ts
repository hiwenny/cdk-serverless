#!/usr/bin/env node
import "source-map-support/register";
import { App } from "@aws-cdk/core";
import { CdkServerlessStack } from "../lib/cdk-serverless-stack";

const app = new App();
new CdkServerlessStack(app, "CdkServerlessStack");
