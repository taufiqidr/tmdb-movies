import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "../components/Layout";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
