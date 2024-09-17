import { Product } from "../types";

const Card = ({ prod, addToCart }: { prod: Product; addToCart: (id: number) => void }) => {
  return (
    <figure className="card">
      <div className="prod-photo">
        <img src={prod.images[0]} alt={prod.title} />
      </div>
      <div className="prod-text">
        <figcaption>{prod.title}</figcaption>
        <h4>$ {prod.price}</h4>
        <p>{prod.description}</p>
        <button className="card-btn" onClick={() => addToCart(prod.id)}>
          Add to cart
        </button>
      </div>
      <button className="card-btn-mobile" onClick={() => addToCart(prod.id)}>
        Add to cart
      </button>
    </figure>
  );
};

export default Card;
