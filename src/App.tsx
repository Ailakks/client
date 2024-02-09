import Layout from "./components/view/Layout";
import Head from "./components/view/Head";
import Header from "./components/view/Header";

export default function App() {
  return (
    <Layout head={<Head />} header={<Header />} />
  )
}
