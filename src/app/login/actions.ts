"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function magicLinkLogin(previousState: { sent: boolean }, formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  if (!email) {
    throw new Error("Email is required");
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");

  return {
    email,
    sent: true
  }
}
