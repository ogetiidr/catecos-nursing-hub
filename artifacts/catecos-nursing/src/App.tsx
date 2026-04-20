import { useEffect, useRef } from "react";
import { ClerkProvider, SignIn, SignUp, useClerk, useUser } from "@clerk/react";
import { Switch, Route, useLocation, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AboutPage from "@/pages/about";
import ServicesPage from "@/pages/services";
import BookPage from "@/pages/book";
import TeamPage from "@/pages/team";
import TestimonialsPage from "@/pages/testimonials";
import ContactPage from "@/pages/contact";
import BlogPage from "@/pages/blog";
import AdminPage from "@/pages/admin";

const queryClient = new QueryClient();

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath) ? path.slice(basePath.length) || "/" : path;
}

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
    </div>
  );
}

const ADMIN_EMAIL = "catecos924@gmail.com";

function AdminRoute() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return null;

  if (!isSignedIn) return <Redirect to="/sign-in" />;

  const hasVerifiedAdminEmail = user.emailAddresses.some(
    (e) => e.emailAddress === ADMIN_EMAIL && e.verification?.status === "verified"
  );

  if (!hasVerifiedAdminEmail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <div className="bg-white rounded-xl shadow p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">
            This dashboard is only accessible with the verified admin email address.
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => window.location.href = `${basePath}/sign-in`}
          >
            Sign in with admin account
          </button>
        </div>
      </div>
    );
  }

  return <AdminPage />;
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (prevUserIdRef.current !== undefined && prevUserIdRef.current !== userId) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qc]);

  return null;
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <TooltipProvider>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={AboutPage} />
            <Route path="/services" component={ServicesPage} />
            <Route path="/book" component={BookPage} />
            <Route path="/team" component={TeamPage} />
            <Route path="/testimonials" component={TestimonialsPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/blog" component={BlogPage} />
            <Route path="/sign-in/*?" component={SignInPage} />
            <Route path="/sign-up/*?" component={SignUpPage} />
            <Route path="/admin" component={AdminRoute} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;
