//here we will declare our data models interfaces or in easy way type of our all datas in our website

export interface MyFetchInterface {
  res: any;
  err: any;
}
export interface IUser {
  email?: string;
  avatar: string;
  token: string;
  tokenType: string;
  displayName?: string;
  password: string;
  role: string;
  fullName: string;
  slug: string;
  createdAt?: string;
  updatedAt: string;
  phone?: string;
  address: {
    country?: string;
    state?: string;
    city?: string;
    address?: string;
  };
}

export interface IShop {
  shop_name?: string;
  shop_address?: string;
  shop_logo?: string;
  shop_cover?: string;
  opens_at?: string;
  close_at?: string;
  geetings_message?: string;
  social_icon?: string;
  social_link?: string;
  seo_title?: string;
  seo_des?: string;
}

// export interface ISeller extends IUser {
//   shop: {
//     shop_name: string;
//     shop_address: string;
//     shop_logo: string;
//     shop_cover: string;
//   };
//   email?: string;
// }

export interface featuredProductLPObj {
  pageNumber: number | string;
}

export interface IProduct {
  productName?: string;
  slug?: string | undefined;
  catSlug?: string;
  subCatSlug?: string;
  brandSlug?: string;
  price?: number;
  description?: string;
  status?: string;
  imageURL: Array<string | undefined>;
  offerPrice: number;
  weight?: number;
  stock?: number;
  seoTitle?: string;
  seoDescription?: string;
  isTopProduct?: boolean;
  isNewArrival?: boolean;
  isBestProduct?: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  seller_slug?: string;
}

export interface ISeller extends IUser {
  email?: string;
  phone?: string;
  shopname?: string;
  shopaddress?: string;
  logoUrl?: string;
  coverUrl?: string;
  status?: string;
  user_email: string;
  shop?: IShop;
  sellerProducts?: IProduct[];
}

export interface IWishlistProduct extends IProduct {
  user_slug?: string;
}
// export interface IReview {
//   slug: string;
//   name: string;
//   message: string;
// }

export interface IOrder {
  subTotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  slug?: string;
  createdAt?: string;
  product_list: ICartProduct[];
  payment_method: string;
  user_slug: string | undefined;
  user_email: string | undefined;
  // transaction_id: string;
  payment_status?: string;
  order_status?: string;
  address: {
    country?: string;
    state?: string;
    city?: string;
    address?: string;
  };
}

export interface IReportedItem {
  slug?: string;
  product_slug?: string;
  user_slug?: string;
  title?: string;
  note?: string;
}
export interface IReview {
  // slug?: string;
  user_slug?: string;
  product_slug?: string;
  title?: string;
  note?: string;
  createdAt: string | undefined;
  status: string;
  rating: number;
  message: string;
  reviewProducts: any;
  user?: IUser;
}

export interface ICart {
  user_slug: string | undefined;
  product_slug: string | undefined;
  quantity: number;
}

export interface ICartProduct extends IProduct {
  cart_slug: string;
  quantity: number;
}

export interface ICategories {
  cat_slug: string;
  cat_name: string;
  cat_image?: string;
  cat_status: string;
  cat_icon: string;
}
export interface ISubCategories {
  slug: string;
  cat_image?: string;
  subcat_name: string;
  subcat_status: string;
  cat_name: string;
  cat_slug: string;
}
export interface IBrands {
  slug?: string;
  logo: string;
  name: string;
  status: string;
}

export interface IAddress {
  name: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  slug: string;
  user_slug: string;
}

export interface ISlider {
  slug?: string;
  image: string;
  badge: string;
  titleOne: string;
  titleTWo: string;
  productLink: string;
  serial: number;
  status: string;
}

export interface IAd {
  slug?: string;
  adName?: string;
  adImage?: string;
  title?: string;
  title_one?: string;
  title_two?: string;
  badge?: string;
  category_link?: string;
  status?: string;
}

export interface IMegaCategory {
  slug?: string;
  cat_name?: string;
  cat_slug?: string;
  serial: number;
  sub_cat_list: object[];
  status: "active" | "inactive";
}

export interface IPopularCategories {
  slug: string;
  cat_slug: string;
  // subcat_name: string;
  // subcat_status: string;
  cat_name: string;
  cat_image: string;
}

export interface IFeaturedCategories {
  slug: string;
  cat_slug: string;
  // subcat_name: string;
  // subcat_status: string;
  cat_name: string;
  cat_image: string;
}

export interface IFlashSaleProducts {
  slug: string;
  product_slug: string;
  status: string;
  productsData: IProduct;
}

export interface IBlog {
  slug: string;
  title: string;
  category?: string;
  description?: string;

  isShowHomepage?: string;
  status?: string;
  imageURL?: string | undefined;

  seo_title?: string;
  seo_description?: string;
  postBy: string;

  createdAt: string;
  updatedAt: string;
}

export interface IBlogCategory extends MyFetchInterface {
  name: string;
  slug?: string;
  status: string;
}

export interface ISubscriber {
  email?: string;
  latestBlogs?: IBlog;
}

export interface IBlogComment {
  slug: string;
  userSlug: string;
  name: string;
  email: string;
  avatar: string;
  comment: string;
  status: string;
}
