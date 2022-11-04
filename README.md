# Multi Region Resources

## プロジェクト作成

```bash
# npm install -g aws-cdk
npm install -g typescript
cdk init app --language typescript
```

## CDK情報

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## 環境作成

```bash
$ cdk list
PrimaryRegionStack
SecondRegionStack
PrimaryRegionRouteStack
SecondRegionRouteStack
```

## 環境作成

## CDK環境初期化

```bash
ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)
AWS_PRIMARY_REGION=ap-northeast-1
AWS_SECONDARY_REGION=ap-northeast-3

cdk bootstrap aws://$ACCOUNT_ID/$AWS_PRIMARY_REGION
cdk bootstrap aws://$ACCOUNT_ID/$AWS_SECONDARY_REGION
```

```bash
cdk deploy "*" --tags tester=gekal
```

![アーキテクチャー](/images/infra.drawio.png)

## 環境クリア

```bash
$ cdk destroy "*"
Are you sure you want to delete: SecondRegionStack, PrimaryRegionStack (y/n)? y
SecondRegionStack: destroying...

 ✅  SecondRegionStack: destroyed
PrimaryRegionStack: destroying...

 ✅  PrimaryRegionStack: destroyed
```

## ヘルプコマンド

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## 参照

1. [Using CDK to perform continuous deployments in multi-region Kubernetes environments](https://aws.amazon.com/jp/blogs/containers/using-cdk-to-perform-continuous-deployments-in-multi-region-kubernetes-environments/)
