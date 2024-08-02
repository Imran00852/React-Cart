import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Home = () => {
  const img1 =
    "https://www.reliancedigital.in/medias/Apple-MGN63HNA-Laptops-491946461-i-1-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxNzczNDJ8aW1hZ2UvanBlZ3xpbWFnZXMvaDVhL2gyZC85NDQzMDgzNTgzNTE4LmpwZ3xhYzRiNWIxZGQ2NjNiNWIyYjI0Y2ZkYTZlZWQ3MTFjZTMxYzVmNDBiNmM5Mzk5OTM2OGVkZmExMjMyYjIxNDQ4";

  const img2 =
    "https://img.freepik.com/free-psd/running-shoes-sneakers-transparent-background_84443-1670.jpg?w=740&t=st=1722523751~exp=1722524351~hmac=4ff529d6824cb7ddce5d52a142b09c46df45812bb93a57948fdb3bbf6e9bc09b";

  const productList = [
    {
      name: "Mac Book",
      price: 120000,
      imgSrc: img1,
      id: "afaczcafsdadsfadf",
    },
    {
      name: "Black shoes",
      price: 500,
      imgSrc: img2,
      id: "aafsdadsfadf",
    },
  ];

  const dispatch = useDispatch();
  const addToCartHandler = (options) => {
    dispatch({
      type: "addCartItem",
      payload: options,
    });
    dispatch({
      type: "calculatePrice",
    });
    toast.success("Added to cart");
  };
  return (
    <div className="home">
      {productList.map((item) => (
        <ProductCard
          key={item.id}
          name={item.name}
          price={item.price}
          imgSrc={item.imgSrc}
          id={item.id}
          handler={addToCartHandler}
        />
      ))}
    </div>
  );
};

const ProductCard = ({ name, id, price, handler, imgSrc }) => (
  <div className="productCard">
    <img src={imgSrc} alt="img" />
    <p>{name}</p>
    <h4>${price}</h4>
    <button onClick={() => handler({ name, imgSrc, quantity: 1, price, id })}>
      Add to Cart
    </button>
  </div>
);
export default Home;
