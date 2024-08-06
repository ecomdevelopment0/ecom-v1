export const GenericPaths = {
    // local storage keys
    AUTH_DATA_LOCAL_STORAGE: "auth_data",

    // authentication routes
    SIGNUP: "/user/signup",
    SIGNUP_VERIFY: "/user/signup/verify",
    LOGIN: "/user/signin",
    NEW_ACCESS_TOKEN: "/user/refresh",
    USER_UPDATE: "/user/update/",
    FORGOT_PASSWORD: "/user/forgot-password",
    FORGOT_PASSWORD_VERIFY: "/user/forgot-password/verify",
    SEND_OTP: "/user/send-otp",

    // cart routes
    CART: "/user/cart?userId=",
    CART_ADD: "/user/cart/add?userId=",
    CART_REMOVE: "/user/cart/remove?userId=",

    // payment routes
    INITIATE_PAYMENT: "/user/payment",
    CHECK_PAYMENT: "/user/payment/check",
    PAYMENT_FAILED: "/user/payment/failed",
    INITIATE_PAYMENT_INDIVIDUAL: "/user/individual/payment",

    // order routes
    ORDER: "/user/order",

    // product routes 
    PRODUCTS: "/products",
    GET_PRODUCT_DETAILS: "/products/product?productId=",
    PRODUCTS_IMAGE: "/products/image",
    PRODUCT_KEYS: "/products/product-keys",

    // review routes 
    GET_ALL_REVIEWS: "/products/reviews",
    ADD_NEW_REVIEW: "/products/reviews?productId=",
    VERIFY_REVIEW: "/products/reviews/verify",

    // categories routes
    CATEGORIES: "/categories",

    // brand routes 
    BRANDS: "/brands",
    BRANDS_IMAGE: "/brands/image",

    // admin routes
    ADMIN_SIGNIN: "/admin/signin",
    ADMIN_REFRESH_TOKENS: "/admin/refresh",
    ADD_NEW_ADMIN: "/admin/new",
    EDIT_ADMIN: "/admin/edit",
    RESET_PASSWORD_FOR_ADMIN: "/admin/password/reset",
    CHANGE_PASSWORD_FOR_SELF: "/admin/password/self",
    DELETE_ADMIN: "/admin/delete",
    GET_ALL_ADMINS: "/admins",
    GET_ADMIN_DETAILS: "/admins/:id",
    GET_ALL_ROLES: "/admin/roles",
    GET_ROLE: "/admin/roles/:id",
    ADD_NEW_ROLE: "/admin/role/new",
    EDIT_ROLE: "/admin/role/edit",
    DELETE_ROLE: "/admin/role/delete",
    GET_ALL_PERMISSIONS: "/admin/permissions",
    VIEW_ALL_CARTS: "/admin/carts",
    VIEW_ALL_ORDERS: "/admin/orders",
    VIEW_ALL_USERS: "/admin/users",
    SEARCH_RESULT: "/search",
};
