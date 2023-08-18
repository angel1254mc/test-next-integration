import { NextResponse } from "next/server";
import { trace, Span, metrics } from '@opentelemetry/api';
import { SeverityNumber, logs } from "@opentelemetry/api-logs";


const requestCounter = metrics.getMeter('test-next-app').createCounter('requests', {
    description: 'Example of a Counter',
  });

// NextJS automatically instruments route handlers, without the need for any additional configuration
export async function GET(request: Request) {
    
    /** some process internal process*/
    console.log("Hello World!")
    
    return NextResponse.json({status: 200, body: "Successful Request!"})
}