// types.ts
export type RootStackParamList = {
  MainTabs: undefined;
  ProductScreen: undefined; // layar utama yang menampilkan daftar produk
  AddProduct: { onSubmit?: (product: any) => void };
};
