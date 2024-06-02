import {
  IAddress,
  IFlashSale,
  IOrder,
  IReview,
  ISeller,
  ISubscriber,
} from "./../../interfaces/models";
import {
  IAllOrderResponse,
  IBlogCategoryResponse,
  IBlogResponse,
  ICartResponse,
  IDataWithUserResponse,
  IDataWoUserResponse,
  IFeaturedCategoriesResponse,
  IFilteredBlogResponse,
  IFilteredProductBySellerResponse,
  IFilteredProductResponse,
  IFlashSaleProductsResponse,
  IFlashSaleResponse,
  IGetAllSellerResponse,
  IGetSingleUserResponse,
  IHomePageDataResponse,
  IMegaCategoriesResponse,
  IOrderResponse,
  IPopularCategoriesResponse,
  IRelatedProductResponse,
  IReviewsResponse,
  ISellerResponse,
  ISingleAddressResponse,
  ISingleAdResponse,
  ISingleBlogResponse,
  ISingleMegaCategoryResponse,
  ISingleOrderResponse,
  ISliderResponse,
  ISubscriberResponse,
  IUserResponse,
} from "./../../interfaces/response";
import {
  ICart,
  ICategories,
  IProduct,
  IReportedItem,
  IUser,
  IWishlistProduct,
  MyFetchInterface,
} from "../../interfaces/models";
import {
  IAllWishlistResponse,
  IBrandsResponse,
  ICategoriesResponse,
  IInitialCartResponse,
  ISingleProductResponse,
  ISubCategoriesResponse,
  IWishlistResponse,
  IAddressResponse,
  ILoginResponse,
  IProductResponse,
} from "../../interfaces/response";
import { callFetch } from "../utils/CallFetch";

export const API_ENDPOINT = process.env["NEXT_PUBLIC_API_ENDPOINT"];

export interface LoginInterface {
  status: number;
  data: {
    access_token: string | null;
  };
}

export class EcommerceApi {
  static async login(data: Partial<IUser>): Promise<ILoginResponse> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/users/login`, requestOptions);
  }

  //Get all wishlist product
  static async getAllWishlistProducts(
    user_slug: string | undefined
  ): Promise<IAllWishlistResponse> {
    const myHeaders = new Headers();
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    return await callFetch(
      `${API_ENDPOINT}/wishlist?user_slug=${user_slug}`,
      requestOptions
    );
  }

  //seller logo & cover image upload
  static async uploadLogoandCover(
    data: Partial<any>
  ): Promise<MyFetchInterface> {
    const requestOptions = {
      method: "POST",
      body: data,
      redirect: "follow",
      cors: "no-cors",
    };
    return await callFetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      requestOptions
    );
  }

  // image add
  static async uploadImage(data: Partial<any>): Promise<MyFetchInterface> {
    const requestOptions = {
      method: "POST",
      body: data,
      redirect: "follow",
      cors: "no-cors",
    };
    return await callFetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      requestOptions
    );
  }

  // add seller information
  static async addSeller(data: Partial<ISeller>): Promise<ISellerResponse> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };
    return await callFetch(
      `${API_ENDPOINT}/users/seller_apply`,
      requestOptions
    );
  }
  //Get all reviews
  static async getAllReviews(
    user_slug: string | undefined
  ): Promise<IReviewsResponse> {
    const myHeaders = new Headers();
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    return await callFetch(
      `${API_ENDPOINT}/reviews?user_slug=${user_slug}`,
      requestOptions
    );
  }

  //Get all reviews
  static async getAllProductReviews(
    product_slug: string | undefined
  ): Promise<IReviewsResponse> {
    const myHeaders = new Headers();
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    return await callFetch(
      `${API_ENDPOINT}/reviews/reviewProducts/${product_slug}`,
      requestOptions
    );
  }

  // Post single wishlist product
  static async postWishlistProduct(
    product: IWishlistProduct
  ): Promise<IWishlistResponse> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(product),
      redirect: "follow",
    };
    return await callFetch(`${API_ENDPOINT}/wishlist`, requestOptions);
  }
  //delete single wishlist product
  static async deleteWishlistSingleProduct(
    product_slug: string | undefined,
    user_slug: string | undefined
  ): Promise<MyFetchInterface> {
    const myHeaders = new Headers();
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/wishlist?user_slug=${user_slug}&product_slug=${product_slug}`,
      requestOptions
    );
  }
  //delete all wishlist product
  static async deleteAllWishlistProduct(
    user_slug: string | undefined
  ): Promise<MyFetchInterface> {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/wishlist/delete_all/${user_slug}`,
      requestOptions
    );
  }
  // order
  static async postOrder(order: IOrder): Promise<IOrderResponse> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(order),
      redirect: "follow",
    };
    return await callFetch(`${API_ENDPOINT}/orders`, requestOptions);
  }

  static async getSingleOrder(slug: string): Promise<ISingleOrderResponse> {
    const myHeaders = new Headers();
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    return await callFetch(`${API_ENDPOINT}/orders/${slug}`, requestOptions);
  }

  static async getAllProducts(): Promise<IProductResponse> {
    const myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${CookiesHandler.getAccessToken()}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    return await callFetch(`${API_ENDPOINT}/products`, requestOptions);
  }

  static async getFilteredProducts(
    search: string | string[],
    categories: string,
    subCategory: string,
    brands: string,
    highlight: string,
    min: number,
    max: number
  ): Promise<IFilteredProductResponse> {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/products/filter?search=${search}&categories=${categories}&sub_category=${subCategory}&brands=${brands}&highlight=${highlight}&min=${min}&max=${max}`,
      requestOptions
    );
  }

  static async getFilteredProductsBySeller(
    shopName: string,
    search: string | string[],
    categories: string,
    subCategory: string,
    brands: string,
    highlight: string,
    min: number,
    max: number
  ): Promise<IFilteredProductBySellerResponse> {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/products/filter-by-shop/${shopName}?search=${search}&categories=${categories}&sub_category=${subCategory}&brands=${brands}&highlight=${highlight}&min=${min}&max=${max}`,
      requestOptions
    );
  }

  // get single product

  static async getSingleProduct(slug: string): Promise<ISingleProductResponse> {
    const myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${CookiesHandler.getAccessToken()}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    return await callFetch(`${API_ENDPOINT}/products/${slug}`, requestOptions);
  }
  // ------------------------------------------------
  static async addReportedItem(
    data: Partial<IReportedItem>
  ): Promise<MyFetchInterface> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };
    return await callFetch(`${API_ENDPOINT}/reporteditems`, requestOptions);
  }
  // ---------------------------------------------------
  static async addReview(data: Partial<IReview>): Promise<MyFetchInterface> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/reviews`, requestOptions);
  }

  static async getAllCartData(
    query: string | undefined
  ): Promise<IInitialCartResponse> {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/cart?user_slug=${query}`,
      requestOptions
    );
  }

  static async addToCart(data: ICart): Promise<ICartResponse> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/cart`, requestOptions);
  }
  static async deleteFromCart(
    user_slug: string | undefined,
    product_slug: string | undefined
  ): Promise<MyFetchInterface> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "Delete",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/cart?user_slug=${user_slug}&product_slug=${product_slug}`,
      requestOptions
    );
  }

  static async updateSingleCartProduct(
    slug: string,
    quantity: number
  ): Promise<ICartResponse> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PATCH",
      body: JSON.stringify({ quantity: quantity }),
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/cart?cart_slug=${slug}`,
      requestOptions
    );
  }

  //get all categories
  static async getCategories(): Promise<ICategoriesResponse> {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/categories`, requestOptions);
  }

  //get sub categories
  static async getSubCategories(): Promise<ISubCategoriesResponse> {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/sub-categories`, requestOptions);
  }
  static async getBrands(): Promise<IBrandsResponse> {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/brands/allbrands`, requestOptions);
  }
  // ---------Mkike
  static async createAddress(
    data: Partial<IAddress>
  ): Promise<IAddressResponse> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/addresses`, requestOptions);
  }
  //Update Address

  static async updateAddress(
    data: Partial<IAddress>,
    slug: string
  ): Promise<ISingleAddressResponse> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: slug ? "PUT" : "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };
    if (slug) {
      return await callFetch(
        `${API_ENDPOINT}/addresses/${slug}`,
        requestOptions
      );
    } else {
      return await callFetch(`${API_ENDPOINT}/addresses`, requestOptions);
    }
  }

  //Get all address Data
  static async allAddress(
    email: string | undefined
  ): Promise<IAddressResponse> {
    const myHeaders = new Headers();
    const requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    };
    return await callFetch(
      `${API_ENDPOINT}/addresses/${email}`,
      requestOptions
    );
  }

  //Delete Address Data

  static async deleteAddress(slug: string): Promise<MyFetchInterface> {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/addresses/${slug}`, requestOptions);
  }

  //delete all cartlist product
  static async deleteAllCartlistProduct(
    user_slug: string | undefined
  ): Promise<MyFetchInterface> {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/cart/delete_all/${user_slug}`,
      requestOptions
    );
  }

  static async updateUserInfo(
    email: string | undefined,
    address: object
  ): Promise<MyFetchInterface> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify(address),
    };

    return await callFetch(
      `${API_ENDPOINT}/users/update-profile-info?email=${email}`,
      requestOptions
    );
  }

  static async allOrders(
    user_slug: string | undefined,
    order_status?: string
  ): Promise<IAllOrderResponse> {
    const myHeaders = new Headers();
    const requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/orders?user_slug=${user_slug}&order_status=${
        order_status ? order_status : ""
      }`,
      requestOptions
    );
  }

  static async getLoggedInUser(
    email: string | undefined
  ): Promise<MyFetchInterface> {
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/users/${email}`, requestOptions);
  }

  //get all Slider
  static async getAllSlider(): Promise<ISliderResponse> {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/slider`, requestOptions);
  }

  //Get single Advertisement
  static async getSingleAd(
    name: string | undefined
  ): Promise<ISingleAdResponse> {
    const myHeaders = new Headers();

    const requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/advertisements/home/${name}`,
      requestOptions
    );
  }

  //Get MegaMenuCategories
  static async getMegaMenuCategories(): Promise<IMegaCategoriesResponse> {
    const myHeaders = new Headers();

    const requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/mega-menu-categories/header`,
      requestOptions
    );
  }

  //Get Single Mega Menue Category

  static async getSingleMegaMenuCategory(
    slug: string
  ): Promise<ISingleMegaCategoryResponse> {
    const myHeaders = new Headers();

    const requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/mega-menu-categories/${slug}`,
      requestOptions
    );
  }

  // get all featured

  static async allFeaturedCategories(): Promise<IFeaturedCategoriesResponse> {
    const myHeaders = new Headers();
    const requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/featured-categories`,
      requestOptions
    );
  }

  static async allPopularCategories(): Promise<IPopularCategoriesResponse> {
    const myHeaders = new Headers();
    const requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/popular-categories`,
      requestOptions
    );
  }

  //  flash sales apis

  static async getFlashSaleProductsData(): Promise<IFlashSaleProductsResponse> {
    const myHeaders = new Headers();

    const requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/flash-sale/user`, requestOptions);
  }

  static async getSingleBlog(slug: string): Promise<ISingleBlogResponse> {
    const myHeaders = new Headers();

    const requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/blogs/${slug}`, requestOptions);
  }

  static async getBlogComments(slug: string): Promise<ISingleBlogResponse> {
    const myHeaders = new Headers();

    const requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/blog-comments/single-blog/${slug}`,
      requestOptions
    );
  }

  static async postBlogComments(data: any): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify(data),
    };

    return await callFetch(`${API_ENDPOINT}/blog-comments`, requestOptions);
  }
  //get all blogs
  static async getAllBlogs(): Promise<IBlogResponse> {
    const myHeaders = new Headers();
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/blogs`, requestOptions);
  }

  //get all categories
  static async getAllBlogCategories(): Promise<IBlogCategoryResponse> {
    const myHeaders = new Headers();
    const requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/blogcategories/for-blog`,
      requestOptions
    );
  }

  // get filtered blog
  static async getFilteredBlog(cat: string): Promise<IFilteredBlogResponse> {
    const myHeaders = new Headers();
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    return await callFetch(
      `${API_ENDPOINT}/blogs/category?category=${cat}`,
      requestOptions
    );
  }

  // add subscriber
  static async addSubscriber(data: ISubscriber): Promise<ISubscriberResponse> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/subscriber`, requestOptions);
  }

  static async getSingleUser(
    slug: string | undefined
  ): Promise<MyFetchInterface> {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/users/private/${slug}`,
      requestOptions
    );
  }

  static async getSellerByUser(
    email: string | undefined
  ): Promise<MyFetchInterface> {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/users/seller/${email}`,
      requestOptions
    );
  }
  //Get all seller
  static async getAllSeller(query: string): Promise<IGetAllSellerResponse> {
    const myHeaders = new Headers();
    const requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    };
    return await callFetch(
      `${API_ENDPOINT}/users/sellers?${query}`,
      requestOptions
    );
  }

  // getsellerwithProducts

  static async getSellerWithProducts(
    seller_slug: string | undefined
  ): Promise<IUserResponse> {
    const myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${CookiesHandler.getAccessToken()}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    return await callFetch(
      `${API_ENDPOINT}/users/sellerWithProducts/${seller_slug}`,
      requestOptions
    );
  }

  //flash sale content get
  static async getFlashSaleContent(name: string): Promise<IFlashSaleResponse> {
    const myHeaders = new Headers();

    const requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/flash-sale/content/${name}`,
      requestOptions
    );
  }

  // getsellerwithProducts
  static async getRelatedProduct(catSlug: string | undefined): Promise<any> {
    const myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${CookiesHandler.getAccessToken()}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    return await callFetch(
      `${API_ENDPOINT}/products/admin/related/${catSlug}`,
      requestOptions
    );
  }

  //get user data for private route
  static async getUserAuth(slug: string): Promise<IGetSingleUserResponse> {
    const myHeaders = new Headers();
    const requestOptions = {
      headers: myHeaders,
      // credentials: 'include',
      credentials: "same-origin",
      redirect: "follow",
    };

    return await callFetch(
      `${API_ENDPOINT}/users/private/${slug}`,
      requestOptions
    );
  }

  // coupon apply
  static async applyCoupon(coupon: string): Promise<any> {
    const myHeaders = new Headers();
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    return await callFetch(
      `${API_ENDPOINT}/coupon/apply/couponCode?code=${coupon}`,
      requestOptions
    );
  }

  static async getSiteDataWoUser(): Promise<IDataWoUserResponse> {
    const myHeaders = new Headers();
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/wo-user`, requestOptions);
  }

  static async getSiteDataWithUser(
    slug: string
  ): Promise<IDataWithUserResponse> {
    const myHeaders = new Headers();
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/with-user/${slug}`, requestOptions);
  }

  static async getHomePageData(): Promise<IHomePageDataResponse> {
    const myHeaders = new Headers();
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(`${API_ENDPOINT}/home`, requestOptions);
  }
}
