import { useCartStore } from "@/stores/cartStore";
import { storeToRefs } from "pinia";

interface Product {
    id: string | number;
    name: string;
    price: number;
    smallThumbnailUrl: string;
}

interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    img: string;
}

export function useCart() {
    const cartStore = useCartStore();
    const { cartQuantity } = storeToRefs(cartStore);

    const addToCart = (product: Product) => {
        let cartItems: CartItem[] = JSON.parse(localStorage.getItem("cartItems") || '[]');

        const newItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            img: product.smallThumbnailUrl
        };

        const existingItem = cartItems.find((item: CartItem) => item.id === newItem.id);
        if (existingItem) {
            existingItem.quantity += newItem.quantity;
        } else {
            cartItems.push(newItem);
        }

        cartStore.setQuantity(cartQuantity.value + 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    };

    return { addToCart };
}
