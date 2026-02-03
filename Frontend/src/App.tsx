import { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Toaster from "./components/toaster";
import Footer from "./components/footer";
import LenisScroll from "./components/lenis";
import Navbar from "./components/navbar";
import { Atom } from "react-loading-indicators";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load page components
const HomePage = lazy(() => import("./pages/HomePage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogDetails = lazy(() => import("./pages/blogs/BlogDetails"));
const Dashboard = lazy(() => import("./dashboard/App"));

// Auth pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ApprovalPendingPage = lazy(() => import("./pages/ApprovalPendingPage"));
const AccessDeniedPage = lazy(() => import("./pages/AccessDeniedPage"));

const MainLayout = () => {
    return (
        <div>
            <LenisScroll />
            <Navbar />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Atom color="#0d9488" size="medium" text="" textColor="#0d9488" /></div>}>
                <Outlet />
            </Suspense>
            <Footer />
        </div>
    );
};

export default function App() {
    return (
        <>
            <Toaster />
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/blogs" element={<BlogsPage />} />
                    <Route path="/blogs/:id" element={<BlogDetails />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Route>
                
                {/* Auth routes - no layout */}
                <Route path="/login" element={
                    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Atom color="#0d9488" size="medium" text="" textColor="#0d9488" /></div>}>
                        <LoginPage />
                    </Suspense>
                } />
                <Route path="/register" element={
                    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Atom color="#0d9488" size="medium" text="" textColor="#0d9488" /></div>}>
                        <RegisterPage />
                    </Suspense>
                } />
                <Route path="/approval-pending" element={
                    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Atom color="#0d9488" size="medium" text="" textColor="#0d9488" /></div>}>
                        <ApprovalPendingPage />
                    </Suspense>
                } />
                <Route path="/access-denied" element={
                    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Atom color="#0d9488" size="medium" text="" textColor="#0d9488" /></div>}>
                        <AccessDeniedPage />
                    </Suspense>
                } />

                {/* Protected dashboard route */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Atom color="#0d9488" size="medium" text="" textColor="#0d9488" /></div>}>
                            <Dashboard />
                        </Suspense>
                    </ProtectedRoute>
                } />
            </Routes>
        </>
    )
}
