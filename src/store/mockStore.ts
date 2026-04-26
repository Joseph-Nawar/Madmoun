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

export type Merchant = {
  id: string;
  name: string;
  logo: string;
  shortDescription: string;
  category: string;
  trustBadge: string;
  rating: number;
  transactionCount: number;
  websiteUrl: string;
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

const merchantTemplates = [
  {
    name: "Cairo Tech Market",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=Cairo%20Tech%20Market",
    shortDescription: "Consumer electronics with escrow-backed checkout and verified fulfillment.",
    category: "Electronics",
    trustBadge: "Top Rated",
    rating: 4.9,
    transactionCount: 28410,
    websiteUrl: "https://example.com/cairo-tech-market",
  },
  {
    name: "Nile Home Studio",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=Nile%20Home%20Studio",
    shortDescription: "Furniture and home goods protected by release-on-confirmation escrow.",
    category: "Home",
    trustBadge: "Verified Partner",
    rating: 4.8,
    transactionCount: 16780,
    websiteUrl: "https://example.com/nile-home-studio",
  },
  {
    name: "Delta Playhouse",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=Delta%20Playhouse",
    shortDescription: "Gaming hardware and accessories with dispute-friendly payment protection.",
    category: "Gaming",
    trustBadge: "Escrow Ready",
    rating: 4.7,
    transactionCount: 12450,
    websiteUrl: "https://example.com/delta-playhouse",
  },
  {
    name: "Lux Accessory Co.",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=Lux%20Accessory%20Co",
    shortDescription: "Premium accessories and wearables integrated with instant escrow status updates.",
    category: "Accessories",
    trustBadge: "Fast Release",
    rating: 4.6,
    transactionCount: 9800,
    websiteUrl: "https://example.com/lux-accessory-co",
  },
  {
    name: "Maya Lifestyle House",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=Maya%20Lifestyle%20House",
    shortDescription: "Lifestyle essentials sold through a monitored checkout flow with escrow guardrails.",
    category: "Lifestyle",
    trustBadge: "Trusted Seller",
    rating: 4.9,
    transactionCount: 21230,
    websiteUrl: "https://example.com/maya-lifestyle-house",
  },
  {
    name: "Alexandria Pro Supply",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=Alexandria%20Pro%20Supply",
    shortDescription: "Marketplace partner for business gear, logistics tools, and secure enterprise orders.",
    category: "Electronics",
    trustBadge: "Enterprise Ready",
    rating: 4.8,
    transactionCount: 15420,
    websiteUrl: "https://example.com/alexandria-pro-supply",
  },
];

const initialMerchants: Merchant[] = merchantTemplates.map((merchant, index) => ({
  id: `merchant_${index + 1}`,
  ...merchant,
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
  merchants: Merchant[];
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

const getInitialState = () => ({
  balance: INITIAL_BALANCE,
  lockedFunds: INITIAL_LOCKED_FUNDS,
  transactions: initialTransactions,
  products: initialProducts,
  merchants: initialMerchants,
  users: initialUsers,
  currentUser: initialUsers[0],
});

const normalizeMerchant = (merchant: Partial<Merchant> & { id: string }): Merchant => ({
  id: merchant.id,
  name: merchant.name ?? "Verified Merchant",
  logo:
    merchant.logo ??
    `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(merchant.id)}`,
  shortDescription:
    merchant.shortDescription ?? "Escrow-enabled partner with verified checkout protection.",
  category: merchant.category ?? "General",
  trustBadge: merchant.trustBadge ?? "Verified",
  rating: typeof merchant.rating === "number" ? merchant.rating : 4.5,
  transactionCount: typeof merchant.transactionCount === "number" ? merchant.transactionCount : 0,
  websiteUrl: merchant.websiteUrl ?? "https://example.com",
});

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...getInitialState(),

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
        set(getInitialState()),

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
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState as Partial<AppState> & { merchants?: Partial<Merchant>[] };

        return {
          ...getInitialState(),
          ...state,
          merchants: Array.isArray(state.merchants)
            ? state.merchants
                .filter((merchant) => Boolean(merchant?.id))
                .map((merchant) => normalizeMerchant(merchant as Partial<Merchant> & { id: string }))
            : initialMerchants,
        };
      },
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        balance: state.balance,
        lockedFunds: state.lockedFunds,
        transactions: state.transactions,
        products: state.products,
        merchants: state.merchants,
        users: state.users,
        currentUser: state.currentUser,
      }),
    }
  )
);
