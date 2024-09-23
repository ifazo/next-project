
export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
    images: string[];
    colors: string[];
    sizes: string[];
    description: string;
    highlights: string[];
    details: string;
    quantity?: number;
};
