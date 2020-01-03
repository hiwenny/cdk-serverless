import { Stack, Construct, StackProps } from "@aws-cdk/core";
import { API_Gateway } from './api_gateway';

export class CdkServerlessStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new API_Gateway(this, 'Analytics');
  }
}
