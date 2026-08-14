import { Route, Switch, Router as WouterRouter } from 'wouter';
    import { Toaster } from '@/components/ui/toaster';
    import { AuthProvider } from '@/contexts/AuthContext';
    import Home from '@/pages/Home';
    import Login from '@/pages/Login';
    import Register from '@/pages/Register';
    import Dashboard from '@/pages/Dashboard';
    import Paid from '@/pages/Paid';

    function NotFound() {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background" dir="rtl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">404 - الصفحة غير موجودة</h1>
          <p className="mt-4 text-muted-foreground">عذراً، الصفحة التي تبحث عنها غير متوفرة.</p>
          <a href="/" className="mt-8 inline-block text-primary font-bold hover:underline">العودة للصفحة الرئيسية</a>
        </div>
      </div>
    );
    }

    function Router() {
    return (
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/paid" component={Paid} />
        <Route component={NotFound} />
      </Switch>
    );
    }

    function App() {
    return (
      <AuthProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, '') || ''}>
          <Router />
          <Toaster />
        </WouterRouter>
      </AuthProvider>
    );
    }

    export default App;
    