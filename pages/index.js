// import { useEffect } from "react/cjs/react.production.min";
import Link from "next/link";
import styled from "styled-components";
import useSWR from "swr";

const StyledH1 = styled.h1`
  color: red;
`;

const StyledAnchor = styled.a`
  padding: 20px;
  background-color: grey;
`;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export async function getStaticProps() {
  const data = await fetch(
    "http://localhost:3000/products?_page=1&_limit=10"
  ).then((res) => res.json());

  return {
    props: {
      products: data,
    },
    revalidate: 10,
  };
}

export default function Home({ products }) {
  // useEffect(() => {
  //   fetch("http://localhost:3000/products");
  // }, []);
  // const { data, error } = useSWR(
  //   "http://localhost:3000/products?_page=1&_limit=10",
  //   fetcher
  // );

  // if (error) {
  //   return <div>Algo deu errado</div>;
  // }

  // if (!data) {
  //   return <div>Loading</div>;
  // }

  return (
    <div>
      <StyledH1>Mercado de Hardware</StyledH1>
      <ul>
        {products.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      <Link href={"/about"}>
        <StyledAnchor>Sobre</StyledAnchor>
      </Link>
    </div>
  );
}
