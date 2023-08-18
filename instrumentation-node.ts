import { NodeSDK } from "@opentelemetry/sdk-node";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-proto";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { SimpleLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
const sdk = new NodeSDK({
     metricReader: new PeriodicExportingMetricReader({
         exporter: new OTLPMetricExporter(),
     }),
     spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
     logRecordProcessor: new SimpleLogRecordProcessor(new OTLPLogExporter()),
   resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "test-next-app",
   }),
});

sdk.start();

