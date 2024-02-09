import Layout from "./components/view/Layout";
import Head from "./components/view/Head";
import Header from "./components/view/Header";
import Side from "./components/view/Side";

export default function App() {
  return (
    <Layout head={<Head />} side={<Side />} header={<Header />} />
  )
}
