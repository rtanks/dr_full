import { Outlet } from "react-router-dom";
import RoutesList from "./route";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Provider} from 'react-redux'
import { store } from "./slices/store";

const client = new QueryClient()

export default function App() {

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <div className="w-full h-[94vh] sm:h-screen p-0 bg-[#f1f1f1]">
          <RoutesList/>
          <Outlet/>
        </div>
      </QueryClientProvider>
    </Provider>
  )
}