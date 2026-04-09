import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Register = () => {
  return (
    <Layout>
      <div className="container-page py-12 sm:py-20 flex justify-center">
        <div className="w-full max-w-lg animate-fade-in">
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
              <UserPlus className="h-6 w-6" />
            </div>
            <h1 className="section-heading">Coordinator Registration</h1>
            <p className="text-muted-foreground mt-2">Create your account to start booking workshops</p>
          </div>

          <form className="card-workshop space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-foreground mb-1.5">
                  First Name
                </label>
                <input id="first-name" type="text" className="input-field" placeholder="First name" required />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-foreground mb-1.5">
                  Last Name
                </label>
                <input id="last-name" type="text" className="input-field" placeholder="Last name" required />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email Address
              </label>
              <input id="email" type="email" className="input-field" placeholder="you@institution.edu" required />
            </div>

            <div>
              <label htmlFor="reg-username" className="block text-sm font-medium text-foreground mb-1.5">
                Username
              </label>
              <input id="reg-username" type="text" className="input-field" placeholder="Choose a username" required />
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <input id="reg-password" type="password" className="input-field" placeholder="Create a password" required />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-foreground mb-1.5">
                Confirm Password
              </label>
              <input id="confirm-password" type="password" className="input-field" placeholder="Confirm your password" required />
            </div>

            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-foreground mb-1.5">
                Institution / College
              </label>
              <input id="institution" type="text" className="input-field" placeholder="Your institution name" required />
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-foreground mb-1.5">
                Department
              </label>
              <input id="department" type="text" className="input-field" placeholder="e.g. Computer Science" required />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Create Account
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already registered?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
