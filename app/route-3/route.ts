import { NextResponse } from "next/server";
import { trace, Span, metrics } from '@opentelemetry/api';
import { SeverityNumber, logs } from "@opentelemetry/api-logs";

const requestCounter = metrics.getMeter('test-next-app').createCounter('requests', {
    description: 'Example of a Counter',
});


export async function GET(request: Request) {
    return trace.getTracer('test-next-app').startActiveSpan('hello-span', (span: Span) => {
        // do stuff in route
        console.log("Hello World, again!")

        logs.getLogger('test-next-app').emit({
            severityNumber: SeverityNumber.INFO,
            severityText: "Info",
            body: "This is an example log, that gets correlated with the surrounding custom span",
            attributes: {
                'loki.attribute.labels': "service_name",
                'service_name': 'test-next-app',
            },
        })
        requestCounter.add(1, { environment: "development" })
        span.end();

        return NextResponse.json({status: 200, body: "Successful Request!"})
    })
}