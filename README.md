This is a small sample app made to display how to use the NodeJS Open Telemetry SDK to instrument your NextJS app and send your Traces, Logs, and Metrics to Grafana Cloud. 

This app is meant to go with the NextJS OTel instructions/integration which was a fun hackathon project I worked on during the 2023 Grafana Hackathon week 🥳🥳

### To get started:
First, you need to install a couple of dependencies:
```bash
npm install
```

Then, you need to export the following environment variables:
```bash
export GRAFANA_INSTANCE_ID="your-grafana-instance-id"
export TOKEN="your-grafana-cloud-access-token"
export OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_ENDPOINT="https://otlp-gateway-your-region-0.grafana.net/otlp"
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Basic $(echo -n $GRAFANA_INSTANCE_ID:$TOKEN | base64 -w 0)"`;
```
* `GRAFANA_INSTANCE_ID` refers to the instance ID of your stack. You can view this in the details section of your Grafana instance
* `TOKEN` refers to the secret-key/token for a cloud access policy with the `:write` permission for the type of data you want to forward (metrics, traces, and/or logs). These are essentially the same tokens used for agent-based integrations
* `OTEL_EXPORTER_OTLP_ENDPOINT` is the endpoint we are forwarding our data to, which in this case would be the grafana otlp gateway for your region. This url follows the schema of `https://otlp-gateway-<zone>.grafana.net/otlp` where <zone> is your region (ex: https://otlp-gateway-prod-us-central-0.grafana.net/otlp). You can read more about this [here](https://grafana.com/docs/grafana-cloud/monitor-infrastructure/otlp/send-data-otlp/)
* `OTEL_EXPORTER_OTLP_HEADERS` ensures that your instance id and token are encoded in the basic auth headers of requests sent to the otlp gateway. This is required to send [data through the gateway](https://grafana.com/docs/grafana-cloud/monitor-infrastructure/otlp/send-data-otlp/)

Finally, you can run the development server:

```bash
npm run dev
```
