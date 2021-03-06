import core = require("@aws-cdk/core");
import apigateway = require("@aws-cdk/aws-apigateway");
import lambda = require("@aws-cdk/aws-lambda");
import s3 = require("@aws-cdk/aws-s3");
/**
 * This is the front door for the measurement pipeline
 * For now it's just a rename from this example: https://docs.aws.amazon.com/cdk/latest/guide/serverless_example.html
 * Which has 3 resources: S3, Lambda, and API Gateway
 */
export class API_Gateway extends core.Construct {
  constructor(scope: core.Construct, id: string) {
    super(scope, id);

    const bucket = new s3.Bucket(this, "WidgetStore");

    const handler = new lambda.Function(this, "WidgetHandler", {
      runtime: lambda.Runtime.NODEJS_8_10, // So we can use async in widget.js
      code: lambda.Code.asset("resources"),
      handler: "widgets.main",
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    bucket.grantReadWrite(handler); // was: handler.role);

    const api = new apigateway.RestApi(this, "widgets-api", {
      restApiName: "Widget Service",
      description: "This service serves widgets."
    });

    const getWidgetsIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    api.root.addMethod("GET", getWidgetsIntegration); // GET /

    // /* More capabilities */
    // const widget = api.root.addResource("{id}");

    // // Add new widget to bucket with: POST /{id}
    // const postWidgetIntegration = new apigateway.LambdaIntegration(handler);

    // // Get a specific widget from bucket with: GET /{id}
    // const getWidgetIntegration = new apigateway.LambdaIntegration(handler);

    // // Remove a specific widget from the bucket with: DELETE /{id}
    // const deleteWidgetIntegration = new apigateway.LambdaIntegration(handler);

    // widget.addMethod("POST", postWidgetIntegration); // POST /{id}
    // widget.addMethod("GET", getWidgetIntegration); // GET /{id}
    // widget.addMethod("DELETE", deleteWidgetIntegration); // DELETE /{id}
  }
}