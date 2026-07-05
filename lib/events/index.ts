import { Event } from "@/lib/types";
import { israelGaza } from "./israel-gaza";
import { russiaUkraine2022 } from "./russia-ukraine-2022";
import { tiktokBan } from "./tiktok-ban";

export const events: Event[] = [russiaUkraine2022, tiktokBan, israelGaza];

export function getEvent(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}
