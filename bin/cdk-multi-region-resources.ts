#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PrimaryRegionStack } from '../lib/primary-region-stack';
import { SecondRegionStack } from '../lib/second-region-stack';

import * as ec2 from 'aws-cdk-lib/aws-ec2';

const app = new cdk.App();

const account = app.node.tryGetContext('account') || process.env.CDK_INTEG_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT;
const primaryRegion = { account: account, region: 'ap-northeast-1' };
const secondaryRegion = { account: account, region: 'ap-northeast-3' };

const primaryRegionStack = new PrimaryRegionStack(app, 'PrimaryRegionStack', {
  description: 'primary region stack',
  env: primaryRegion,
  crossRegionReferences: true,
});

const primaryRegionRouteStack = new cdk.Stack(app, 'PrimaryRegionRouteStack', {
  description: 'primary region route stack',
  env: primaryRegion,
  crossRegionReferences: true,
});

const secondRegionStack = new SecondRegionStack(app, 'SecondRegionStack', {
  description: 'second region stack',
  env: secondaryRegion,
  crossRegionReferences: true,
});

const secondRegionRouteStack = new cdk.Stack(app, 'SecondRegionRouteStack', {
  description: 'second region route stack',
  env: secondaryRegion,
  crossRegionReferences: true,
});

// VPCピアリングで２つのVPCを相互接続する
const vpcPeeringConnection = new ec2.CfnVPCPeeringConnection(primaryRegionRouteStack, 'VpcPeeringConnection', {
  vpcId: cdk.Token.asString(primaryRegionStack.vpc.vpcId),
  peerVpcId: cdk.Token.asString(secondRegionStack.vpc.vpcId),
  peerRegion: secondaryRegion.region,
  tags: [
    {
      key: 'Name',
      value: 'VpcPeeringConnection',
    }
  ]
});

primaryRegionStack.vpc.publicSubnets.map((iSubnet: ec2.ISubnet, index: number) => {
  new ec2.CfnRoute(primaryRegionRouteStack, `PrimaryRegionVpcRoute${index}`, {
    routeTableId: iSubnet.routeTable.routeTableId,
    destinationCidrBlock: secondRegionStack.vpc.vpcCidrBlock,
    vpcPeeringConnectionId: vpcPeeringConnection.ref,
  });
});

secondRegionStack.vpc.publicSubnets.map((iSubnet: ec2.ISubnet, index: number) => {
  new ec2.CfnRoute(secondRegionRouteStack, `SecondRegionVpcRoute${index}`, {
    routeTableId: iSubnet.routeTable.routeTableId,
    destinationCidrBlock: primaryRegionStack.vpc.vpcCidrBlock,
    vpcPeeringConnectionId: vpcPeeringConnection.ref,
  });
});
