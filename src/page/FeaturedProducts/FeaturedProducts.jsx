import React from "react";

const products = [
    {
        id: 1,
        name: "Fujifilm Instax Mini 11 (Charcoal Gray)",
        image:
            "https://www.startech.com.bd/image/cache/catalog/instant-camera/fujifilm/instax-mini-11/instax-mini-11-charcoal-gray-500x500.webp",
        price: "$70",
    },
    {
        id: 2,
        name: "Fujifilm Instax Mini 12 (Pastel Blue)",
        image:
            "https://www.startech.com.bd/image/cache/catalog/instant-camera/fujifilm/instax-mini-12/instax-mini-12-pastel-blue-500x500.webp",
        price: "$75",
    },
    {
        id: 3,
        name: "SJCAM A20 Action Camera",
        image:
            "https://www.startech.com.bd/image/cache/catalog/camera/action-camera/sjcam/sjcam-a20/a20-01-500x500.webp",
        price: "$120",
    },
    {
        id: 4,
        name: "Akaso Brave 7 LE Action Camera",
        image:
            "https://www.startech.com.bd/image/cache/catalog/camera/action-camera/akaso/brave-7-le/brave-7-le-01-500x500.webp",
        price: "$140",
    },
    {
        id: 5,
        name: "SJCAM SJ8 Pro Action Camera",
        image:
            "https://www.startech.com.bd/image/cache/catalog/camera/action-camera/sjcam/sj8-pro/sj8-pro-01-500x500.webp",
        price: "$180",
    },
    {
        id: 6,
        name: "Akaso V50X Action Camera",
        image:
            "https://www.startech.com.bd/image/cache/catalog/camera/action-camera/akaso/v50x/v50x-01-500x500.webp",
        price: "$110",
    },
    {
        id: 7,
        name: "Akaso Brave 7 Action Camera",
        image:
            "https://www.startech.com.bd/image/cache/catalog/camera/action-camera/akaso/brave-7/brave-7-01-500x500.webp",
        price: "$150",
    },
    {
        id: 8,
        name: "SJCAM SJ10X Action Camera",
        image:
            "https://www.startech.com.bd/image/cache/catalog/camera/action-camera/sjcam/sj10x/sj10x-01-500x500.webp",
        price: "$200",
    },
    {
        id: 9,
        name: "GoPro Hero 9 Action Camera",
        image:
            "https://www.startech.com.bd/image/cache/catalog/camera/action-camera/gopro/hero-9/hero-9-01-500x500.webp",
        price: "$350",
    },
    {
        id: 10,
        name: "Sony HDR-CX405 Handy Camera",
        image:
            "https://www.startech.com.bd/image/cache/catalog/DSLR/sony/hdr-cx405/sony-hdr-cx405 handy-camera-500x500.webp",
        price: "$250",
    },
];

const FeaturedProducts = () => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-center text-gray-900">
                    Featured Products
                </h2>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="max-w-xs h-full overflow-hidden hover:shadow-lg bg-white"
                        >

                            <img src={product.image} alt={product.name} className="w-full" />
                            <div className="px-4 py-2">
                                <h2 className="font-semibold">{product.name}</h2>
                                {/* <h3 className="text-center text-sm text-gray-600">{brand}</h3> */}

                                <h2 className="text-lg font-bold">{product.price}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;
