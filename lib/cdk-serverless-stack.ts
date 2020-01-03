import { Stack, Construct, StackProps } from "@aws-cdk/core";
import widget_service from '../lib/example_widget_service';

export class CdkServerlessStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new widget_service(this, 'Widgets');
  }
}
