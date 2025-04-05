export interface Product {
    id?: string;
    name: string;
    slug: string;
    price?: string; 
    regularPrice?: string;
    salePrice?: string;
    featuredImage?: {
        node?: {
            sourceUrl?: string;
            altText?: string;
        };
    };
    productCategories?: {
        nodes?: {
            name?: string;
        }[];
    };
} 