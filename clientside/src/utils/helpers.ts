import axios from "axios";
import { categoryType, productType } from "./types";
import { toast } from "react-toastify";
import { SetStateAction } from "react";

export const getAllCategories = (setFunc: SetStateAction<any>): void => {
    axios
        .get("/api/v1/category/")
        .then((res) => {
            setFunc(res.data.categories);
        })
        .catch((error) =>
            toast.error("Something went wrong while getting category")
        );
};

export const getAllProducts = (setProducts: any) => {
    axios
        .get("/api/v1/product")
        .then((res) => setProducts(res.data.products))
        .catch((err) => toast.info(err.response.data.message));
};

export const handleDelete = (id: number, getAllProducts?: any) => {
    axios
        .get(`/api/v1/product/delete/${id}`)
        .then((res) => {
            toast.success("Product has been successfully deleted."),
                getAllProducts();
        })
        .catch((err) => toast.error(err.data));
};

// Example of how getSingleProduct might be implemented
export const getSingleProduct = async (slug: string | undefined) => {
    try {
        const response = await axios.get(`/api/v1/product/${slug}`);
        console.log(response)
        return response.data.product;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
};


export const getCart = (): productType[] => {
    let cart = localStorage.getItem('cart') as string

    if (cart) {
    }
    else {
        localStorage.setItem('cart', JSON.stringify([]))
    }

    const parsedCart = JSON.parse(cart)

    return parsedCart
}

export const addItemToCart = (item: productType) => {
    try {
        const cart = getCart()

        let newCart: productType[] = [...cart]

        const itemIndex = newCart.findIndex(
            (product: productType) => item?._id === product._id
        );

        console.log(itemIndex)

        if (itemIndex !== -1) {
            newCart[itemIndex].amount++
        }
        else {
            newCart = [...cart, { ...item, amount: 1 }]
        }


        const stringifiedCart = JSON.stringify(newCart)

        localStorage.setItem('cart', stringifiedCart)

        toast.success('Item successfully added to cart')

        return newCart
    }
    catch (error) {
        console.log(error)
        toast.error(error as string)
    }
}

export const removeItemFromCart = (item: productType) => {
    const cart = getCart()

    let newCart: productType[] = cart.filter((product) => product._id !== item._id)

    const stringifiedCart = JSON.stringify(newCart)

    localStorage.setItem('cart', stringifiedCart)

    return newCart
}

export const decreaseAmount = (item: productType) => {
    const cart = getCart()
    let newCart: productType[] = []

    const itemIndex = cart.findIndex(
        (product: productType) => item?._id === product._id
    );

    newCart = [...cart]
    newCart[itemIndex].amount--

    const stringifiedCart = JSON.stringify(newCart)

    localStorage.setItem('cart', stringifiedCart)
    return newCart
}

export const increaseAmount = (item: productType) => {
    const cart = getCart()
    let newCart: productType[] = []

    const itemIndex = cart.findIndex(
        (product: productType) => item?._id === product._id
    );

    newCart = [...cart]
    newCart[itemIndex].amount++

    const stringifiedCart = JSON.stringify(newCart)

    localStorage.setItem('cart', stringifiedCart)
    return newCart
}

export const clearCart = () => {
    localStorage.setItem('cart', JSON.stringify([]))
}