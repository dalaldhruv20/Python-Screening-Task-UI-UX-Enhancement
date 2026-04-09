import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Layout>
      <div className="container-page py-12 sm:py-20 flex justify-center">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
              <LogIn className="h-6 w-6" />
            </div>
            <h1 className="section-heading">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Sign in to manage your workshops</p>
          </div>

          <form className="card-workshop space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-1.5">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="input-field"
                placeholder="Enter your username"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="input-field pr-10"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-input" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link to="/login" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              New here?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
