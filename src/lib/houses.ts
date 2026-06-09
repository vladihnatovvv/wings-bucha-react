import duplex from "@/assets/type-duplex.jpg";
import townhouse from "@/assets/type-townhouse.jpg";
import cottage from "@/assets/type-cottage.jpg";

export type House = {
  id: string;
  name: string;
  type: "duplex" | "townhouse" | "cottage";
  img: string;
  area: number;
  beds: number;
  baths: number;
  floors: number;
  plot: number;
  priceUsd: number;
  available: number;
  features: string[];
};

export const HOUSES: House[] = [
  {
    id: "duplex",
    name: "Дуплекс «Сосна»",
    type: "duplex",
    img: duplex,
    area: 128,
    beds: 3,
    baths: 2,
    floors: 2,
    plot: 3,
    priceUsd: 145000,
    available: 8,
    features: ["Тераса 18 м²", "Гараж", "Газове опалення", "Панорамні вікна"],
  },
  {
    id: "townhouse",
    name: "Таунхаус «Криве»",
    type: "townhouse",
    img: townhouse,
    area: 96,
    beds: 2,
    baths: 2,
    floors: 2,
    plot: 1.5,
    priceUsd: 112000,
    available: 12,
    features: ["Внутрішній дворик", "Місце під авто", "Газове опалення", "Тепла підлога"],
  },
  {
    id: "cottage",
    name: "Котедж «Політ»",
    type: "cottage",
    img: cottage,
    area: 165,
    beds: 4,
    baths: 3,
    floors: 2,
    plot: 6,
    priceUsd: 189000,
    available: 5,
    features: ["Власна ділянка 6 соток", "Камін", "Гараж на 2 авто", "Сауна-зона"],
  },
];

export const fmtUsd = (n: number) => "$" + new Intl.NumberFormat("uk-UA").format(n);
export const fmtUah = (usd: number) =>
  new Intl.NumberFormat("uk-UA").format(Math.round(usd * 41)) + " ₴";

export const COMPARE_STORAGE_KEY = "wb_compare_ids";

export function readCompare(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(COMPARE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function writeCompare(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    return;
  }
}
