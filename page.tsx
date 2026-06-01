import { redirect } from "next/navigation";

// Početna stranica vodi direktno na prodavnicu
// Ako želiš posebnu početnu stranicu, zameni redirect sa pravim sadržajem
export default function HomePage() {
  redirect("/shop");
}
