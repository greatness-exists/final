import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from 'sonner'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Rooms from '@/pages/Rooms'
import Dining from '@/pages/Dining'
import Activities from '@/pages/Activities'
import Wellness from '@/pages/Wellness'
import Gallery from '@/pages/Gallery'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminContent from '@/pages/admin/Content'
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminRooms from '@/pages/admin/Rooms'
import AdminGallery from '@/pages/admin/Gallery'
import AdminLogin from '@/pages/admin/Login'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import HoverReceiver from "@/visual-edits/VisualEditsMessenger";

// Configure QueryClient with error handling and retry logic
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <HoverReceiver />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
          <Route path="/rooms" element={<><Navbar /><Rooms /><Footer /></>} />
          <Route path="/dining" element={<><Navbar /><Dining /><Footer /></>} />
          <Route path="/activities" element={<><Navbar /><Activities /><Footer /></>} />
          <Route path="/wellness" element={<><Navbar /><Wellness /><Footer /></>} />
          <Route path="/gallery" element={<><Navbar /><Gallery /><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
          <Route index element={<AdminDashboard />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="rooms" element={<AdminRooms />} />
            <Route path="gallery" element={<AdminGallery />} />
          </Route>

          <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;