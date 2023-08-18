"use client"
import Image from 'next/image'
import useFetch from '@/app/utils/useFetch'

const RouteButton = ({url, description} : any) => {
  const {loading, error, success, fetchRoute} = useFetch(url)

  return (
    <div className="flex flex-col w-full gap-y-2">
       <div className="w-full flex flex-row items-center gap-x-4">
         <button onClick={() => fetchRoute()} className=" transition-all duration-150 hover:bg-blue-200 hover:shadow-lg shadow-blue-800 px-4 w-[8rem] py-1 bg-white border-width-[1px] text-black rounded-sm">
            {url}
         </button>
         <p>{description}</p>
       </div>
       {loading ? <p className="text-yellow-300">Loading result...</p> : success ? <p className="text-green-300">Success!</p> : error ? <p className="text-red-300">There was an error</p> : <></>}
     </div>
  );
}
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col pt-8 items-center p-24">
      <div className="flex flex-col gap-y-4 w-full max-w-[48rem] items-center">
        <h1 className="text-3xl font-bold text-center w-full">
          Welcome to the Grot Stop!
        </h1>
        <Image alt="yellow grot" src="/yellow-grot.png" width={370} height={282} className="max-w-[30rem] w-full"/>
        <p className="max-w-[48rem] w-full">This is a minimal NextJS 13 (App Router) setup using the NodeJS Open Telemetry SDK to export Metrics, Logs, and Traces to Grafana Cloud. This can also be integrated with the faro-web-sdk on the frontend to implement distributed tracing accross your Next App!</p>
        <div className="w-full flex flex-col gap-y-2">
          {[
          {
            url: '/route-1',
            description: "Generates a root span for the route"
          },
          {
            url: '/route-2', 
            description: "Generates the root span + a custom span",
          },
          {
            url: '/route-3',
            description: "Root span + custom span + correlated log + increments a metric",
          }
          ].map((route) => {
            return <RouteButton url={route.url} description={route.description}/>
          })}
        </div>
      </div>
      
    </main>
  )
}
