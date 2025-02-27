# AWS Step Functions Architecture Diagram

Below is an architecture diagram for the file processing workflow:

```mermaid
graph TD
    User([User]) -->|Uploads file| S3[S3 Bucket]
    S3 -->|Object Created Event| EB[EventBridge]
    EB -->|Triggers| SF[Step Functions State Machine]
    
    subgraph "State Machine Workflow"
        SF -->|Executes| LA[Lambda Function A]
        LA -->|Completes| LB[Lambda Function B]
        LB -->|Completes| LD[Lambda Function D]
    end
    
    LA -->|Stores metadata| DDB[(DynamoDB)]
    
    classDef aws fill:#FF9900,stroke:#232F3E,stroke-width:2px,color:white;
    classDef lambda fill:#009900,stroke:#232F3E,stroke-width:2px,color:white;
    classDef stepfunctions fill:#CC2264,stroke:#232F3E,stroke-width:2px,color:white;
    classDef dynamodb fill:#3B48CC,stroke:#232F3E,stroke-width:2px,color:white;
    
    class S3,EB aws;
    class LA,LB,LD lambda;
    class SF stepfunctions;
    class DDB dynamodb;
```

## Alternative Diagram for Export

If you need a PNG or SVG version, you can use this PlantUML code:

```plantuml
@startuml
!define AWSPuml https://raw.githubusercontent.com/awslabs/aws-icons-for-plantuml/v14.0/dist
!include AWSPuml/AWSCommon.puml
!include AWSPuml/Storage/SimpleStorageService.puml
!include AWSPuml/ApplicationIntegration/EventBridge.puml
!include AWSPuml/ApplicationIntegration/StepFunctions.puml
!include AWSPuml/Compute/Lambda.puml
!include AWSPuml/Database/DynamoDB.puml

actor User

User -> SimpleStorageService : 1. Uploads File
SimpleStorageService -> EventBridge : 2. Object Created Event
EventBridge -> StepFunctions : 3. Triggers State Machine

package "Step Functions Workflow" {
  StepFunctions -> Lambda as "LambdaA" : 4. Execute Lambda A
  "LambdaA" -> DynamoDB : 5. Store File Metadata
  "LambdaA" -> Lambda as "LambdaB" : 6. Complete & Execute Lambda B
  "LambdaB" -> Lambda as "LambdaD" : 7. Complete & Execute Lambda D
}

@enduml
```

You can render these diagrams:
1. For Mermaid: Use a Markdown editor that supports Mermaid, GitHub, or tools like [Mermaid Live Editor](https://mermaid.live)
2. For PlantUML: Use [PlantUML Online Server](https://www.plantuml.com/plantuml/uml/)

## AWS Architecture Diagram

Below is a simplified AWS service architecture diagram:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────────┐
│             │     │             │     │                     │
│    User     │────▶│  S3 Bucket  │────▶│     EventBridge     │
│             │     │             │     │                     │
└─────────────┘     └─────────────┘     └──────────┬──────────┘
                                                   │
                                                   ▼
┌─────────────┐                      ┌─────────────────────────┐
│             │                      │                         │
│  DynamoDB   │◀─────────────────────│  Step Functions         │
│  Table      │                      │  State Machine          │
│             │                      │                         │
└─────────────┘                      └─────────────┬───────────┘
                                                   │
                                        ┌──────────┴──────────┐
                                        │                     │
                                        ▼                     ▼
                            ┌─────────────────┐     ┌─────────────────┐
                            │                 │     │                 │
                            │   Lambda A      │────▶│    Lambda B     │
                            │                 │     │                 │
                            └─────────────────┘     └────────┬────────┘
                                                             │
                                                             ▼
                                                   ┌─────────────────┐
                                                   │                 │
                                                   │    Lambda D     │
                                                   │                 │
                                                   └─────────────────┘
``` 