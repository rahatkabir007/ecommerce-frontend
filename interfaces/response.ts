import {
  IProduct,
  IUser,
  IReportedItem,
  ICartProduct,
  ICategories,
  ISubCategories,
  IBrands,
  IOrder,
  IReview,
  ISlider,
  IAd,
  IMegaCategory,
  IFeaturedCategories,
  IPopularCategories,
  ISeller,
  IFlashSaleProducts,
  IBlog,
  IBlogCategory,
  ISubscriber,
  IBlogComment,
  IFlashSale,
  IWishlistProduct,
} from "./models";
import { MyFetchInterface } from "./MyFetchInterface";
import { IAddress } from "./models";
//here we will declare our response interfaces or in easy way type of our all response in our website

export interface IResponseUser extends IUser {
  //with User model this particular extra data will come as response
  totalPictures: number;
}
export interface ILoginResponse extends MyFetchInterface {
  res: {
    slug: string;
    access_token: string;
    userId: string;
    role: string;
  };
}

export interface IFilteredProductResponse extends MyFetchInterface {
  res: { filteredProducts: IProduct[]; count: number };
}

export interface IRelatedProductResponse extends MyFetchInterface {
  res: IProduct[];
}

export interface IFilteredProductBySellerResponse extends MyFetchInterface {
  res: { sellerData: ISeller; filteredProducts: IProduct[]; count: number };
}

export interface IProductResponse extends MyFetchInterface {
  res: {
    featuredProducts: Array<IProduct>;
    topProducts: Array<IProduct>;
    popularProducts: Array<IProduct>;
    bestProducts: Array<IProduct>;
    newProducts: Array<IProduct>;
    allProductData: Array<IProduct>;
    // relatedProductData: Array<IProduct>;
    // relatedProductData: Array<IProduct>;
  };
}
export interface IWishlistResponse extends MyFetchInterface {
  res: {
    data: IProduct;
    message: string;
  };
}

export interface ISellerResponse extends MyFetchInterface {
  res: ISeller;
}

export interface IOrderResponse extends MyFetchInterface {
  res: {
    data: string;
    message: string;
  };
}

export interface IAllOrderResponse extends MyFetchInterface {
  res: {
    data: IOrder[];
    message: string;
  };
}

export interface ISingleOrderResponse extends MyFetchInterface {
  res: IOrder;
}

export interface IAllWishlistResponse extends MyFetchInterface {
  res: IProduct[];
}
export interface IReviewsResponse extends MyFetchInterface {
  res: IReview[];
}
export interface ICartResponse extends MyFetchInterface {
  res: {
    slug: string;
    cart_slug: string;
    user_slug: string;
    quantity: number;
  };
}

export interface IInitialCartResponse extends MyFetchInterface {
  res: ICartProduct[];
}
export interface ISingleProductResponse extends MyFetchInterface {
  res: IProduct;
}
export interface ICategoriesResponse extends MyFetchInterface {
  res: ICategories[];
}
export interface ISubCategoriesResponse extends MyFetchInterface {
  res: ISubCategories[];
}
export interface IBrandsResponse extends MyFetchInterface {
  res: IBrands[];
}
export interface IAddressResponse extends MyFetchInterface {
  res: Array<IAddress>;
}

export interface ISingleAddressResponse extends MyFetchInterface {
  res: IAddress;
}
export interface ISliderResponse extends MyFetchInterface {
  res: Array<ISlider>;
}

export interface ISingleSliderResponse extends MyFetchInterface {
  res: ISlider;
}

export interface IAdResponse extends MyFetchInterface {
  res: IAd[];
}

export interface ISingleAdResponse extends MyFetchInterface {
  res: IAd;
}

export interface IMegaCategoriesResponse extends MyFetchInterface {
  res: IMegaCategory[];
}

export interface ISingleMegaCategoryResponse extends MyFetchInterface {
  res: IMegaCategory;
}

export interface IFeaturedCategoriesResponse extends MyFetchInterface {
  res: IFeaturedCategories[];
}

export interface IPopularCategoriesResponse extends MyFetchInterface {
  res: IPopularCategories[];
}

export interface IFlashSaleProductsResponse extends MyFetchInterface {
  res: IFlashSaleProducts[];
}

export interface ISingleBlogResponse extends MyFetchInterface {
  res: IBlog;
}

export interface IBlogCommentsResponse extends MyFetchInterface {
  res: IBlogComment[];
}

export interface IBlogResponse extends MyFetchInterface {
  res: {
    allBlogs: Array<IBlog>;
    latestBlogs: Array<IBlog>;
  };
}

export interface IBlogCategoryResponse extends MyFetchInterface {
  res: IBlogCategory[];
}

export interface ISubscriberResponse extends MyFetchInterface {
  res: ISubscriber;
}

export interface IFilteredBlogResponse extends MyFetchInterface {
  res: IBlog[];
}

export interface IUserResponse extends MyFetchInterface {
  res: IUser;
}

export interface IGetAllSellerResponse extends MyFetchInterface {
  res: ISeller[];
}

export interface IFlashSaleResponse extends MyFetchInterface {
  res: IFlashSale;
}

export interface IGetSingleUserResponse extends MyFetchInterface {
  res: IUser;
}

export interface IDataWoUserResponse extends MyFetchInterface {
  res: {
    categories: ICategories[];
    brands: IBrands[];
    subCategories: ISubCategories[];
  };
}

export interface IDataWithUserResponse extends MyFetchInterface {
  res: {
    categories: ICategories[];
    brands: IBrands[];
    subCategories: ISubCategories[];
    user: IUser;
    cart: ICartProduct[];
    wishlist: IWishlistProduct[];
  };
}

export interface IHomePageDataResponse extends MyFetchInterface {
  res: {
    sliders: ISlider[];
    sliderOne: IAd;
    sliderTwo: IAd;
    popularCategories: IPopularCategories[];
    flashSale: IFlashSale;
    featuredCategories: IFeaturedCategories[];
    adOne: IAd;
    adTwo: IAd;
  };
}
