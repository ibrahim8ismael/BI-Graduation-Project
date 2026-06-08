"use server";

import { redirect } from "next/navigation";

export async function submitDemoRequest(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const size = formData.get("size") as string;
  const industry = formData.get("industry") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !company) {
    throw new Error("Name, email, and company are required.");
  }

  console.log("Demo request received:", {
    name,
    email,
    company,
    size,
    industry,
    message,
  });

  redirect("/book-demo?success=true");
}
