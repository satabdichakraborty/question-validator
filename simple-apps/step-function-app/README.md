# AWS Step Functions File Processing Workflow

This project defines an AWS Step Functions workflow that is triggered when a file is uploaded to an S3 bucket. The workflow consists of three Lambda functions executed in sequence:

1. **Lambda Function A**: Extracts metadata from the uploaded file and stores it in a DynamoDB table
2. **Lambda Function B**: Processes the file further (placeholder implementation)
3. **Lambda Function D**: Performs final processing (placeholder implementation)

## Architecture

The detailed architecture diagram is available in the [architecture-diagram.md](./architecture-diagram.md) file.

The workflow follows this sequence:
1. A file is uploaded to the S3 bucket
2. EventBridge detects the S3 event and triggers the Step Functions state machine
3. The state machine executes Lambda Function A, which extracts file metadata and stores it in DynamoDB
4. Once Lambda Function A completes, Lambda Function B is executed
5. Once Lambda Function B completes, Lambda Function D is executed
6. The workflow completes

## Deployment

### Prerequisites

- AWS CLI configured with appropriate credentials
- AWS SAM CLI (optional, for easier deployment)

### Deployment Steps

#### Option 1: Using AWS CloudFormation Console

1. Open the AWS CloudFormation console
2. Click "Create stack" > "With new resources (standard)"
3. Select "Upload a template file" and upload the `template.yaml` file
4. Follow the prompts to name your stack and set any parameters
5. Review and create the stack

#### Option 2: Using AWS CLI

```bash
aws cloudformation deploy \
  --template-file template.yaml \
  --stack-name file-processing-workflow \
  --capabilities CAPABILITY_IAM
```

#### Option 3: Using AWS SAM CLI

```bash
sam deploy \
  --template-file template.yaml \
  --stack-name file-processing-workflow \
  --capabilities CAPABILITY_IAM
```

## Usage

After deployment, the CloudFormation stack outputs will include:
- `SourceBucketName`: The name of the S3 bucket to upload files to
- `StateMachineArn`: The ARN of the Step Functions state machine
- `DynamoDBTableName`: The name of the DynamoDB table where file metadata is stored

To trigger the workflow:
1. Upload a file to the S3 bucket using AWS Console or AWS CLI:
   ```bash
   aws s3 cp your-file.txt s3://YOUR-BUCKET-NAME/
   ```
2. The Step Functions workflow will automatically start
3. You can monitor the execution in the AWS Step Functions console

## Customization

To customize the Lambda functions for your specific use case:
1. Modify the Lambda function code in the `ZipFile` sections of the CloudFormation template
2. Add any additional resources needed by your functions
3. Update IAM roles to grant necessary permissions
4. Redeploy the stack

## Monitoring and Troubleshooting

- View Step Functions executions in the AWS Step Functions console
- Check CloudWatch Logs for each Lambda function
- Review the DynamoDB table to see stored file metadata

## Cleanup

To delete all resources created by this stack:

```bash
aws cloudformation delete-stack --stack-name file-processing-workflow
```

This will delete all resources created by the stack, including the S3 bucket, Lambda functions, Step Functions state machine, DynamoDB table, and IAM roles.

## Security Considerations

- The IAM roles in this template follow the principle of least privilege
- Make sure to review and adjust permissions as needed for your specific use case
- Consider enabling encryption for the S3 bucket and DynamoDB table for sensitive data 