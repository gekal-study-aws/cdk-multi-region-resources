import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class PrimaryRegionStack extends cdk.Stack {

    readonly _vpc: ec2.Vpc;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const vpc = new ec2.Vpc(this, 'PrimaryRegionVpc', {
            ipAddresses: ec2.IpAddresses.cidr("10.1.0.0/16"),
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'public',
                    subnetType: ec2.SubnetType.PUBLIC,
                }
            ]
        });
        this._vpc = vpc;
    }

    get vpc() {
        return this._vpc;
    }
}
