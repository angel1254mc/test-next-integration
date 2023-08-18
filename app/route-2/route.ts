
import { NextResponse } from "next/server";
import { trace, Span } from '@opentelemetry/api';


export async function GET(request: Request) {
    return trace.getTracer('test-next-app').startActiveSpan('hello-span', (span: Span) => {
        /**Do operations,emit logs, update metrics etc. */
        console.log("Hello World Again!")
        span.end();
        return NextResponse.json({status: 200, body: "Successful Request!"})
    })
}