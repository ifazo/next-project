type Image = {
    src: string;
};

type Color = {
    name: string;
    class: string;
    selectedClass: string;
};

type Size = {
    name: string;
    inStock: boolean;
};

export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    quantity: number;
    images: Image[];
    colors: Color[];
    sizes: Size[];
    description: string;
    highlights: string[];
    details: string;
};
