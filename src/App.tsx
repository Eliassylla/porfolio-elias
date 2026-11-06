import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Layout } from "@/components/layout/Layout";
import { Header } from "@/components/layout/Header";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { lazy, Suspense, useState } from "react";
import { LoadingFallback } from "@/components/ui/LoadingFallback";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CalBookingDialog } from "@/components/booking/CalBookingDialog";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { captureAttributionFromWindow } from "@/lib/attribution/session";
import { Analytics } from "@vercel/analytics/react";

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const [attribution] = useState(captureAttributionFromWindow);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SkipToContent />
            <Header />
            <CalBookingDialog attribution={attribution} />
            <ScrollProgress />
            <SmoothScroll>
              <Layout>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    {/* V1 : landing unique. Les pages secondaires restent dans le
                        code pour une évolution fondée sur du contenu réel. */}
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
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
