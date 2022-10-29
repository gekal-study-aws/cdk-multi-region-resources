#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PrimaryRegionStack } from '../lib/primary-region-stack';
import { SecondRegionStack } from '../lib/second-region-stack';

const app = new cdk.App();

const account = app.node.tryGetContext('account') || process.env.CDK_INTEG_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT;
const primaryRegion = { account: account, region: 'ap-northeast-1' };
const secondaryRegion = { account: account, region: 'ap-northeast-3' };

const primaryRegionStack = new PrimaryRegionStack(app, 'PrimaryRegionStack', {
  description: 'primary region stack',
  env: primaryRegion
});

const secondRegionStack = new SecondRegionStack(app, 'SecondRegionStack', {
  description: 'second region stack',
  env: secondaryRegion
});
