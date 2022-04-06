import useSWR from "swr";

export async function getStaticPaths() {
  const data = await fetch(
    "http://localhost:3000/products?_page=1&_limit=10"
  ).then((res) => res.json());

  const paths = data.map((item) => {
    return { params: { id: String(item.id) } };
  });

  return {
    paths,
    fallback: false,
  };
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export async function getStaticProps({ params }) {
  const data = await fetch(`http://localhost:3000/products/${params.id}`).then(
    (res) => res.json()
  );

  return {
    props: {
      product: data,
    },
  };
}

const Product = ({ product }) => {
  const { data, error } = useSWR(
    `http://localhost:3000/products/${product.id}`,
    fetcher,
    {
      fallbackData: product,
    }
  );

  // if (error) {
  //   return <div>Algo deu errado</div>;
  // }

  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h1>Nome: {data.title}</h1>
      <h2>Descricao: {data.desc}</h2>
      <h3>Price: R$ {data.price}</h3>
    </div>
  );
};

export default Product;
