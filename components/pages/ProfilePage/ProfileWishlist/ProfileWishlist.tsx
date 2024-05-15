import Link from "next/link";
import { useSelector } from "react-redux";
import WishlistCart from "../../WishlistPage/WishlistCart";
import { controller } from "./../../../../src/state/StateController";

interface Props {}

const ProfileWishlist: React.FC<Props> = (props) => {
  const wishlistData = useSelector(() => controller.states.wishlistData);

  return (
    <div className="w-full min-h-screen pb-[5px]">
      {wishlistData?.length === 0 ? (
        <div>
          <div className="flex justify-center items-center mb-12">
            <div>
              <img
                src="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fwebsite-images%2Fempty_wishlist-2022-11-17-11-23-16-9350.png&w=1920&q=75"
                alt=""
              />
            </div>
          </div>

          <div className="flex  justify-center">
            <h1 className="sm:text-xl text-base font-semibold text-center mb-5">
              Empty! You don't have any{" "}
              <span className="capitalize"> wishlist </span>
              products
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <Link href="/">
              <div className="w-[180px] h-[50px] ">
                <button className="yellow-btn ">Back to Shop</button>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <WishlistCart></WishlistCart>
        </>
      )}
    </div>
  );
};

export default ProfileWishlist;
