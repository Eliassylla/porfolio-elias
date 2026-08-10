import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Layout } from "@/components/layout/Layout";
import { Header } from "@/components/layout/Header";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { lazy, Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { LoadingFallback } from "@/components/ui/LoadingFallback";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CalBookingDialog } from "@/components/booking/CalBookingDialog";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SpeedInsights />
          <BrowserRouter>
            <SkipToContent />
            <Header />
            <CalBookingDialog />
            <ScrollProgress />
            <SmoothScroll>
              <Layout>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    {/* V1 : landing unique. Les pages secondaires restent dans le
                        code pour une évolution fondée sur du contenu réel ; un
                        formulaire Supabase + Resend n'est pas requis pour la V1. */}
                    <Route path="/services" element={<Navigate to="/" replace />} />
                    <Route path="/portfolio" element={<Navigate to="/" replace />} />
                    <Route path="/portfolio/:id" element={<Navigate to="/" replace />} />
                    <Route path="/contact" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Layout>
            </SmoothScroll>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
