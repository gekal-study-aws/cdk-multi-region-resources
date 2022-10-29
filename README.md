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
cdk deploy --tags tester=gekal
```

![アーキテクチャー](/images/infra.drawio.png)

## 環境クリア

```bash
cdk deploy
```

## ヘルプコマンド

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
