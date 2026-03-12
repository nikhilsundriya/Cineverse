"use client";

import { PropsWithChildren, Suspense } from "react";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import { usePathname, useRouter } from "next/navigation";
import useDiscoverFilters from "@/hooks/useDiscoverFilters";

export const queryClient = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const { content } = useDiscoverFilters();

  const tv = pathname?.includes("/tv/") || content === "tv";

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
          <Suspense fallback={null}>
            <ProgressProvider
              options={{ showSpinner: false }}
              color={`hsl(var(--heroui-${tv ? "warning" : "primary"}))`}
            >
              {children}
            </ProgressProvider>
          </Suspense>
        </NextThemesProvider>
      </HeroUIProvider>

      {/* Toast Provider must NOT wrap children */}
      <ToastProvider
        placement="top-right"
        maxVisibleToasts={1}
        toastOffset={10}
        toastProps={{
          shouldShowTimeoutProgress: true,
          timeout: 5000,
          classNames: {
            content: "mr-7",
            closeButton:
              "opacity-100 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-auto",
          },
        }}
      />

      <div className="hidden md:block">
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}
