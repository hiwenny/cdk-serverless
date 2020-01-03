# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Roadmap
Create a stack of data pipeline
Tracking -> Storing Raw Data -> Funneling into Analytics
Front door:
- API Gateway
Collect and transform: storing raw data from multiple sources into a universal format
- Lambda ingest ?
- Kinesis Firehose/DataStream: Which one suits?
- Lambda transform into universal tagged data
- S3 (raw data)
Transformation: translating the specifics into Analytics vendor tags
- Kinesis DataStream (multi stream)
- Kinesis Firehose/DataStream (single stream)
- Lambda transform
- S3

Questions:
How to structure CDK if there is an established resources built via SDK?