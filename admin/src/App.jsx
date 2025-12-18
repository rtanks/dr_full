import { Provider } from "react-redux";
import LoaderProvider from "./pages/LoaderProvider";
import Router from "./Routes";
import {store} from "./store";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

export default function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <Router/>
      </Provider>
    </QueryClientProvider>
  );
}
