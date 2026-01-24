import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TransactionStatus =
  | "pending"
  | "escrow"
  | "shipped"
  | "delivered"
  | "completed"
  | "disputed";

export type Transaction = {
  id: string;
  amount: number;
  status: TransactionStatus;
  buyer: string;
  seller: string;
  product: string;
  createdAt: string;
  escrowReleaseDate?: string;
  trackingId?: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  seller: string;
  images: string[];
  category: string;
  location: string;
  rating: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  balance: number;
};

const INITIAL_BALANCE = 15000;
const INITIAL_LOCKED_FUNDS = 0;

const userSeeds = [
  "Ahmed",
  "Nour",
  "Salma",
  "Karim",
  "Laila",
  "Omar",
  "Maya",
  "Adel",
  "Yara",
  "Hassan",
];

const initialUsers: User[] = userSeeds.map((name, index) => ({
  id: `user_${index + 1}`,
  name: `${name} Hassan`,
  email: `${name.toLowerCase()}@example.com`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
  balance: 15000 + index * 500,
}));

const productTemplates = [
  "iPhone 15 Pro",
  "MacBook Air M3",
  "Samsung S24 Ultra",
  "AirPods Pro",
  "Sony PlayStation 5",
  "Dyson Airwrap",
  "Canon EOS R7",
  "Bose QC45",
  "Microsoft Surface",
  "Dell XPS 13",
  "IKEA Desk",
  "Gaming Chair",
  "Apple Watch",
  "GoPro Hero",
  "Smart TV 55\"",
  "Logitech MX",
  "Nespresso Machine",
  "Nintendo Switch",
  "Meta Quest",
  "Kindle Paperwhite",
];

const locations = ["Cairo", "Giza", "Alexandria", "New Cairo", "Zamalek"];
const categories = ["Electronics", "Home", "Gaming", "Accessories", "Lifestyle"];

const initialProducts: Product[] = productTemplates.map((title, index) => ({
  id: `prod_${index + 1}`,
  title,
  description: `Premium ${title} with verified condition and escrow protection.`,
  price: 1500 + index * 1200,
  seller: initialUsers[(index + 2) % initialUsers.length].name,
  images: [
    `https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80`,
  ],
  category: categories[index % categories.length],
  location: locations[index % locations.length],
  rating: Number((4.3 + (index % 6) * 0.1).toFixed(1)),
}));

const statusCycle: TransactionStatus[] = [
  "pending",
  "escrow",
  "shipped",
  "delivered",
  "completed",
  "disputed",
];

const initialTransactions: Transaction[] = Array.from({ length: 50 }).map(
  (_, index) => {
    const status = statusCycle[index % statusCycle.length];
    const product = initialProducts[index % initialProducts.length];
    return {
      id: `MDM-${3200 + index}`,
      amount: product.price,
      status,
      buyer: initialUsers[0].name,
      seller: product.seller,
      product: product.title,
      createdAt: new Date(Date.now() - index * 86400000).toISOString(),
      trackingId: `EG-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  }
);

interface AppState {
  balance: number;
  lockedFunds: number;
  transactions: Transaction[];
  products: Product[];
  users: User[];
  currentUser: User;
  addFunds: (amount: number) => void;
  sendMoney: (amount: number, recipient: string) => void;
  requestMoney: (amount: number, from: string) => void;
  createTransaction: (data: Omit<Transaction, "id" | "createdAt">) => string;
  updateTransactionStatus: (id: string, status: TransactionStatus) => void;
  releaseEscrow: (id: string) => void;
  resetDemo: () => void;
  quickDemo: () => string;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      balance: INITIAL_BALANCE,
      lockedFunds: INITIAL_LOCKED_FUNDS,
      transactions: initialTransactions,
      products: initialProducts,
      users: initialUsers,
      currentUser: initialUsers[0],

      addFunds: (amount) =>
        set((state) => ({
          balance: state.balance + amount,
          transactions: [
            {
              id: `TOPUP-${Date.now()}`,
              amount,
              status: "completed",
              buyer: state.currentUser.name,
              seller: "Madmoun Wallet",
              product: "Wallet Top-up",
              createdAt: new Date().toISOString(),
            },
            ...state.transactions,
          ],
        })),

      sendMoney: (amount, recipient) =>
        set((state) => ({
          balance: Math.max(0, state.balance - amount),
          transactions: [
            {
              id: `SEND-${Date.now()}`,
              amount,
              status: "completed",
              buyer: state.currentUser.name,
              seller: recipient,
              product: "Wallet Transfer",
              createdAt: new Date().toISOString(),
            },
            ...state.transactions,
          ],
        })),

      requestMoney: (amount, from) =>
        set((state) => ({
          transactions: [
            {
              id: `REQ-${Date.now()}`,
              amount,
              status: "pending",
              buyer: from,
              seller: state.currentUser.name,
              product: "Payment Request",
              createdAt: new Date().toISOString(),
            },
            ...state.transactions,
          ],
        })),

      createTransaction: (data) => {
        const id = `ESC-${Date.now()}`;
        const transaction: Transaction = {
          ...data,
          id,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          balance: state.balance - data.amount,
          lockedFunds: state.lockedFunds + data.amount,
          transactions: [transaction, ...state.transactions],
        }));

        setTimeout(() => get().updateTransactionStatus(id, "escrow"), 900);
        setTimeout(() => get().updateTransactionStatus(id, "shipped"), 2500);

        return id;
      },

      updateTransactionStatus: (id, status) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...tx, status } : tx
          ),
        })),

      releaseEscrow: (id) =>
        set((state) => {
          const target = state.transactions.find((tx) => tx.id === id);
          const amount = target?.amount ?? 0;
          return {
            lockedFunds: Math.max(0, state.lockedFunds - amount),
            transactions: state.transactions.map((tx) =>
              tx.id === id
                ? { ...tx, status: "completed", escrowReleaseDate: new Date().toISOString() }
                : tx
            ),
          };
        }),

      resetDemo: () =>
        set({
          balance: INITIAL_BALANCE,
          lockedFunds: INITIAL_LOCKED_FUNDS,
          transactions: initialTransactions,
          products: initialProducts,
          users: initialUsers,
          currentUser: initialUsers[0],
        }),

      quickDemo: () => {
        const product = get().products[0];
        return get().createTransaction({
          amount: product.price,
          status: "pending",
          buyer: get().currentUser.name,
          seller: product.seller,
          product: product.title,
        });
      },
    }),
    {
      name: "madmoun-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        balance: state.balance,
        lockedFunds: state.lockedFunds,
        transactions: state.transactions,
        products: state.products,
        users: state.users,
        currentUser: state.currentUser,
      }),
    }
  )
);
