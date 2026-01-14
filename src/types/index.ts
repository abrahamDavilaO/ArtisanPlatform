export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
    images: string[];
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type ProductCategory =
    | "furniture"
    | "art"
    | "lighting"
    | "accessories";

export interface Collection {
    id: string;
    name: string;
    description: string;
    image: string;
    productCount: number;
    slug: string;
}

export interface ArtPiece {
    id: string;
    title: string;
    artist: string;
    price: number;
    image: string;
    description: string;
    dimensions: string;
    medium: string;
}

export interface NewsletterSubscription {
    email: string;
    subscribedAt: Date;
}

export interface ContactForm {
    name: string;
    email: string;
    message: string;
    phone?: string;
}
