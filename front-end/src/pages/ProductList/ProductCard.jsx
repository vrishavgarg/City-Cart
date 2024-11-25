const ProductCard = ({ product, image }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <img
        src={image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600 mt-1">
        Price: ${Number(product.price).toFixed(2)}
      </p>
      <p className="text-gray-600 mt-1">Rating: {product.rating}⭐</p>
      <p className="text-sm text-gray-500 mt-2">{product.description}</p>
    </div>
  );
};

export default ProductCard;
