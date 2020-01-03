# Welcome to your CDK TypeScript project!

This is an experiment for creating a stack of data pipeline using
 TypeScript with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Quick Start
This is a multi-step build. Normally it goes as such:
  * First do `npm run build` to generate the js files
  * Then `cdk synth` to build the CloudFormation template to be deployed
  * Continue to `cdk bootstrap` to stage it. This will create a staging bucket in S3, which __needs to be cleaned up manually__ (see [Useful commands](#useful-commands) below for more info)
  * After that, it's time to `cdk deploy`
  * After you're done, do `cdk destroy` to cleanup after. NOTE: As of 3/2/2020 this command creates yet another S3 staging bucket and doesn't completely clean up the S3 buckets, so some manual deletion is still required __after__ it finishes deleting the CloudFormation stack.

## Useful commands
  * `npm run build`   compile typescript to js
  * `npm run watch`   watch for changes and compile
  * `npm run test`    perform the jest unit tests
  * `cdk deploy`      deploy this stack to your default AWS account/region
  * `cdk diff`        compare deployed stack with current state
  * `cdk synth`       emits the synthesized CloudFormation template
  * `cdk bootstrap`   required to stage the stack for deployment. IMPORTANT: this creates S3 bucket which will incur a charge if not cleaned up: https://docs.aws.amazon.com/cdk/latest/guide/tools.html#tools_bootstrap so delete CDKToolkit in CloudFormation as soon as you're done
  * `cdk destroy`     for deleting the CloudFormation stack(s). This will also create an S3 staging bucket for some reason even after deletion post-bootstrap, so again delete manually

## Roadmap
Tracking -> Storing Raw Data -> Funneling into Analytics

Front door:
  * API Gateway

Collect and transform: storing raw data from multiple sources into a universal format
  * Lambda ingest (can do without?)
  * Kinesis Firehose/DataStream: Which one suits?
  * Lambda transform into universal tagged data
  * S3 ("raw" data)

Transformation: translating the specifics into Analytics vendor tags
  * Kinesis DataStream (multi stream)
  * Kinesis Firehose/DataStream (single stream)
  * Lambda transform
  * S3

## FAQs
CDK-centric questions that came up while trying this out:

1. CDK/AWS complains about misconfiguration/missing environment/??? on `cdk synth/cdk deploy`: try to set the __[default]__ credentials with a User that has Administrator access. These can be changed in `~/.aws/credentials` and make sure `~/.aws/config` has a region. 
   As of now CDK error messages can be quite misleading, so if you're following a tutorial and it's erroring, check the permissions first. 

2. Alternatively, do development in an Admin user in `DEV` environment, and get a Cloud Security expert to set it up properly for `PROD` with proper permissions for different resources. Not ideal, but for the sake of development... just tag it [NEEDS REVIEW] and add __proper configuration__ as a __requirement for release__. 

3. FYI: Remember to do `cdk destroy` with every planned infra changes to clean it up. In general, __do not__ delete resources manually since this breaks the CloudFormation reference, causing weird errors (something about environments). If needed, delete CloudFormation stack to start over.

4. The exception to is related to `cdk bootstrap` staging process and `cdk destroy`: both create S3 CDKToolkit buckets for staging, which you need to delete manually in order to not get charged despite `cdk destroy` supposedly meant to do a one-touch cleanup...

5. How to structure CDK if there is an established resources built via SDK?
   - Use `fromXYZ()` method in each constructs to check existing one (https://garbe.io/blog/2019/09/20/hey-cdk-how-to-use-existing-resources/)
   - In that case, it's no use having separate repos for each resource (SDK-based publishing) - can just do all in one CDK repo.
  
6. Is this still in beta though?
   - Possibly, considering it's not in AWS main console yet, and the general bits and pieces hanging off still (e.g. no auto-cleanup of staging bucket). It is promising, though.