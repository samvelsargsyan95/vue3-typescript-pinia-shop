<template>
  <div v-if="!showPurchaseMessage">
    <v-table v-if="cartItems.length" height="550px" fixed-header>
      <thead>
        <tr>
          <th class="text-center">Image</th>
          <th class="text-center">Name</th>
          <th class="text-center">Quantity</th>
          <th class="text-center">Price</th>
          <th class="text-center">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItems" :key="item.id" class="hovered-tr">
          <td class="text-center">
            <img
              :src="item?.img"
              :alt="`Product ${item?.name}`"
              class="product-img"
            />
          </td>
          <td class="text-center">{{ item?.name }}</td>
          <td class="text-center">{{ item?.quantity }}</td>
          <td class="text-center">{{ item?.price.toFixed(2) }}</td>
          <td class="text-center">
            <span
              @click="removeProductFromCart(item.id)"
              class="mdi mdi-delete-outline delete-icon cursor-pointer"
            ></span>

            <v-number-input control-variant="split"></v-number-input>
          </td>
        </tr>
        <tr>
          <td colspan="5" class="text-right">
            <b class="me-3">Total: {{ totalPrice.toFixed(2) }}</b>
            <v-btn
              @click="purchaseOrder"
              color="teal-accent-4"
              variant="elevated"
            >
              Place order
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-alert
      v-else
      border="top"
      type="warning"
      variant="outlined"
      class="mt-6 mx-auto"
      width="50%"
      prominent
    >
      The Cart Is Empty...
    </v-alert>
  </div>

  <v-fade-transition v-else hide-on-leave class="mt-6">
    <v-card append-icon="$close" class="mx-auto" elevation="16" max-width="500">
      <template v-slot:append>
        <v-btn
          icon="$close"
          variant="text"
          @click="showPurchaseMessage = false"
        ></v-btn>
      </template>

      <v-divider></v-divider>

      <div class="py-12 text-center">
        <v-icon
          class="mb-6"
          color="teal-accent-4"
          icon="mdi-check-circle-outline"
          size="128"
        ></v-icon>

        <div class="text-h4 font-weight-bold">
          Congratulating you on your purchase
        </div>
      </div>

      <v-divider></v-divider>

      <div class="pa-4 text-end">
        <v-btn
          class="text-none"
          color="medium-emphasis"
          min-width="92"
          variant="outlined"
          rounded
          @click="showPurchaseMessage = false"
        >
          Close
        </v-btn>
      </div>
    </v-card>
  </v-fade-transition>
</template>


<script lang="ts">
import { defineComponent, ref, computed, Ref } from "vue";
import { useCartStore } from "@/stores/cartStore";

interface CartItem {
  id: number;
  img: string;
  name: string;
  quantity: number;
  price: number;
}

export default defineComponent({
  setup() {
    // Pinia
    const cartItems: Ref<CartItem[]> = ref([]);
    const { setQuantity } = useCartStore();

    // Variables
    const showPurchaseMessage : Ref<boolean> = ref(false);
    const storedCartItems : string | null = localStorage.getItem("cartItems");

    if (storedCartItems) {
      cartItems.value = JSON.parse(storedCartItems);
    }

    const totalPrice = computed(() => {
      return cartItems.value.reduce((total : number, item : any) => total + item.price * item.quantity, 0);
    });

    const purchaseOrder = () => {
      // Clear the cartItems array by setting its value to an empty array
      showPurchaseMessage.value = true; // Show the purchase message
      cartItems.value = [];
      localStorage.removeItem("cartItems"); // Clear the localStorage
      setQuantity(0); // Reset quantity in the store
    };

    const removeProductFromCart = (productId: number) => {
      cartItems.value = cartItems.value.filter((item : any) => item.id !== productId);
      localStorage.setItem("cartItems", JSON.stringify(cartItems.value));

      // After removing item from cart set new quantity for cart
      setQuantity(cartItems.value.reduce((total : number, item : any) => total + item.quantity, 0));
    };

    return {
      cartItems,
      totalPrice,
      showPurchaseMessage,
      purchaseOrder,
      removeProductFromCart,
    };
  },
});
</script>

<style lang="scss">
.delete-icon {
  font-size: 23px;

  &:hover {
    color: red;
  }
}
</style>
