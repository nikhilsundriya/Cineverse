"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import {
  ForgotPasswordFormInput,
  ForgotPasswordFormSchema,
  LoginFormInput,
  LoginFormSchema,
  RegisterFormInput,
  RegisterFormSchema,
  ResetPasswordFormInput,
  ResetPasswordFormSchema,
} from "@/schemas/auth";
import { z } from "zod";
import { ActionResponse } from "@/types";

/**
 * Generic auth action type
 */
type AuthAction<T> = (data: T, supabase: SupabaseClient) => ActionResponse;

/**
 * Higher-order wrapper for validation + captcha + client
 */
const createAuthAction = <T extends { captchaToken?: string }>(
  schema: z.ZodSchema<T>,
  action: AuthAction<T>,
  admin?: boolean,
) => {
  return async (formData: T): ActionResponse => {
    const result = schema.safeParse(formData);

    if (!result.success) {
      const message = result.error.issues.map((i) => i.message).join(". ");
      return { success: false, message };
    }

    // ✅ Skip captcha in development only
    const isDev = process.env.NODE_ENV === "development";
    if (!result.data.captchaToken && !isDev) {
      return { success: false, message: "Captcha is required." };
    }

    try {
      const supabase = await createClient(admin);
      return await action(result.data, supabase);
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }
      return { success: false, message: "An unexpected error occurred." };
    }
  };
};

/* ================= SIGN IN ================= */

const signInWithEmailAction: AuthAction<LoginFormInput> = async (
  data,
  supabase,
) => {
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.loginPassword,
    options: {
  ...(data.captchaToken && { captchaToken: data.captchaToken }),
},
  });

  if (error) return { success: false, message: error.message };

  const { data: username, error: usernameError } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.user.id)
    .maybeSingle();

  if (!username) {
    console.error("Username check error:", usernameError);
    return {
      success: false,
      message: `Database error. Could not get username for ${user.user.email}.`,
    };
  }

  return { success: true, message: `Welcome back, ${username.username}` };
};

/* ================= SIGN UP ================= */

const signUpAction: AuthAction<RegisterFormInput> = async (data, supabase) => {
  // Check username availability
  const { data: usernameExists, error: usernameError } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", data.username)
    .maybeSingle();

  if (usernameError) {
  console.error("FULL USERNAME ERROR OBJECT:", usernameError);

  return {
    success: false,
    message: `DB ERROR: ${JSON.stringify(usernameError)}`,
  };
}

  if (usernameExists) {
    return { success: false, message: "Username already taken." };
  }

  // Create auth user
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
  email: data.email,
  password: data.password,
  options: {
    ...(data.captchaToken && { captchaToken: data.captchaToken }),
  },
});

  if (signUpError) return { success: false, message: signUpError.message };
  if (!authData.user) {
    return { success: false, message: "User not created. Please try again." };
  }

  // Insert profile
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({ id: authData.user.id, username: data.username });

  if (profileError) {
    console.error("Profile creation error:", profileError);
    return {
      success: false,
      message: "Could not create user profile. Please contact support.",
    };
  }

  return {
    success: true,
    message:
      "Sign up successful. Please check your email for verification. Check spam folder if you don't see it.",
  };
};

/* ================= RESET EMAIL ================= */

const sendResetPasswordEmailAction: AuthAction<ForgotPasswordFormInput> = async (
  data,
  supabase,
) => {
  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    captchaToken: data.captchaToken,
  });

  if (error) return { success: false, message: error.message };

  return {
    success: true,
    message: `We have sent an email to ${data.email}. Check spam folder if you don't see it.`,
  };
};

/* ================= RESET PASSWORD ================= */

const resetPasswordAction: AuthAction<ResetPasswordFormInput> = async (
  data,
  supabase,
) => {
  const { error } = await supabase.auth.updateUser({
    password: data.password,
  });

  if (error) return { success: false, message: error.message };

  return { success: true, message: "Password has been reset successfully." };
};

/* ================= EXPORTS ================= */

export const signIn = createAuthAction(LoginFormSchema, signInWithEmailAction);
export const signUp = createAuthAction(RegisterFormSchema, signUpAction);
export const sendResetPasswordEmail = createAuthAction(
  ForgotPasswordFormSchema,
  sendResetPasswordEmailAction,
);
export const resetPassword = createAuthAction(
  ResetPasswordFormSchema,
  resetPasswordAction,
);

export const signOut = async (): ActionResponse => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) return { success: false, message: error.message };

  return { success: true, message: "You have been signed out." };
};