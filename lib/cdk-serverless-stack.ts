import cdk = require('@aws-cdk/core');
import widget_service = require('../lib/widget_service');

export class CdkServerlessStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new widget_service.WidgetService(this, 'Widgets');
  }
}
