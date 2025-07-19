import Product from "@/features/main-page/components/Product";
import products from "@/data/products.json";

const ProductsGalary = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto grid grid-cols-4 justify-items-center gap-[32px] px-[16px]">
      {products.products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          image={product.productImages[0]}
          name={product.category}
          description={product.name}
          smallPrice={product.smallPrice}
        />
      ))}
    </div>
  );
};

export default ProductsGalary;
