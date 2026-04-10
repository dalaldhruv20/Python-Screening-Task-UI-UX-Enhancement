import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser, UserRole } from "@/contexts/UserContext";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, setUser } = useUser();

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regStep, setRegStep] = useState(0);
  const [regRole, setRegRole] = useState<UserRole | "">("");
  const [regFirst, setRegFirst] = useState("");
  const [regLast, setRegLast] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regInstitution, setRegInstitution] = useState("");
  const [regDepartment, setRegDepartment] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === "register" && regStep > 0) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [regStep, mode]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginUsername);
    navigate("/home");
  };

  const handleRegComplete = () => {
    setUser({
      firstName: regFirst,
      lastName: regLast,
      email: regEmail,
      username: regUsername,
      institution: regInstitution,
      department: regDepartment,
      phone: "",
      role: regRole as UserRole,
    });
    navigate("/home");
  };

  const regSteps = [
    { label: "Role", key: "role" },
    { label: "First Name", key: "first" },
    { label: "Last Name", key: "last" },
    { label: "Email", key: "email" },
    { label: "Username", key: "username" },
    { label: "Password", key: "password" },
    { label: "Institution", key: "institution" },
    { label: "Department", key: "department" },
  ];

  const canProceed = () => {
    switch (regStep) {
      case 0: return !!regRole;
      case 1: return regFirst.trim().length > 0;
      case 2: return regLast.trim().length > 0;
      case 3: return regEmail.includes("@");
      case 4: return regUsername.trim().length > 0;
      case 5: return regPassword.length >= 4;
      case 6: return regInstitution.trim().length > 0;
      case 7: return regDepartment.trim().length > 0;
      default: return false;
    }
  };

  const handleRegNext = () => {
    if (regStep < regSteps.length - 1) setRegStep(regStep + 1);
    else handleRegComplete();
  };

  const handleRegKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canProceed()) {
      e.preventDefault();
      handleRegNext();
    }
  };

  const resetRegister = () => {
    setRegStep(0);
    setRegRole("");
    setRegFirst("");
    setRegLast("");
    setRegEmail("");
    setRegUsername("");
    setRegPassword("");
    setRegInstitution("");
    setRegDepartment("");
  };

  const glassInput = "w-full h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] px-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[hsl(25,90%,55%)]/30 focus:border-[hsl(25,90%,55%)]/20 transition-all";

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden px-5 py-10" style={{ background: 'hsl(20 10% 4%)' }}>
      {/* Top-right warm glow */}
      <div
        className="absolute top-0 right-0 w-[70vw] h-[60vh] opacity-25 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 20%, hsl(25 80% 40%) 0%, transparent 65%)",
        }}
      />
      {/* Bottom-left subtle cool */}
      <div
        className="absolute bottom-0 left-0 w-[50vw] h-[40vh] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 85%, hsl(200 30% 25%) 0%, transparent 65%)",
        }}
      />

      {/* Logo above card */}
      <div className="relative z-10 mb-8">
        <img
          src="/fossee-logo-full.png"
          alt="FOSSEE — Free and Open Source Software for Education"
          className="h-14 sm:h-16 w-auto object-contain drop-shadow-lg"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[420px]">
        {mode === "login" ? (
          <div className="animate-fade-in">
            <div className="rounded-3xl border p-8 shadow-2xl" style={{
              background: 'hsl(20 8% 7% / 0.85)',
              borderColor: 'hsl(25 6% 14%)',
              backdropFilter: 'blur(24px)',
            }}>
              <div className="mb-7">
                <h1 className="text-[26px] font-bold text-white leading-tight tracking-tight font-heading">
                  Welcome Back
                </h1>
                <p className="text-white/50 text-sm mt-1">Sign in to manage your workshops</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="text"
                  className={glassInput}
                  placeholder="Username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={cn(glassInput, "pr-12")}
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-2xl text-white transition-all text-sm font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, hsl(25 90% 55%), hsl(30 85% 50%))',
                    boxShadow: '0 4px 20px -4px hsl(25 90% 55% / 0.3)',
                  }}
                >
                  Sign In
                </Button>
              </form>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px" style={{ background: 'hsl(25 6% 16%)' }} />
                <span className="text-xs" style={{ color: 'hsl(25 5% 35%)' }}>or</span>
                <div className="flex-1 h-px" style={{ background: 'hsl(25 6% 16%)' }} />
              </div>

              <Button
                onClick={() => { resetRegister(); setMode("register"); }}
                className="w-full h-12 rounded-2xl text-foreground hover:bg-secondary transition-all text-sm font-medium"
                style={{ background: 'hsl(20 6% 11%)', border: '1px solid hsl(25 6% 16%)' }}
                variant="ghost"
              >
                Create an Account
              </Button>
            </div>

            <p className="text-center text-[11px] text-white/30 mt-6 leading-relaxed">
              FOSSEE · IIT Bombay · Workshop Booking Platform
            </p>
          </div>
        ) : (
          <div className="animate-fade-in" onKeyDown={handleRegKeyDown}>
            <div className="rounded-3xl border p-8 shadow-2xl" style={{
              background: 'hsl(20 8% 7% / 0.85)',
              borderColor: 'hsl(25 6% 14%)',
              backdropFilter: 'blur(24px)',
            }}>
              <button
                onClick={() => {
                  if (regStep === 0) setMode("login");
                  else setRegStep(regStep - 1);
                }}
                className="h-9 w-9 rounded-full flex items-center justify-center transition-all mb-6" style={{ background: 'hsl(20 6% 11%)', border: '1px solid hsl(25 6% 16%)', color: 'hsl(30 10% 70%)' }}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <div className="flex gap-1.5 mb-6">
                {regSteps.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 rounded-full flex-1 transition-all duration-300",
                      i <= regStep ? "bg-primary" : "bg-secondary"
                    )}
                  />
                ))}
              </div>

              <div className="min-h-[200px]">
                {regStep === 0 && (
                  <div className="animate-slide-up">
                    <h2 className="text-[26px] font-bold text-white leading-tight mb-2 font-heading">
                      Let's Get Started
                    </h2>
                    <p className="text-white/50 text-sm mb-6">Choose your role to continue</p>
                    <div className="space-y-3">
                      {[
                        { value: "coordinator" as UserRole, title: "Workshop Coordinator", desc: "Book workshops for your institution" },
                        { value: "instructor" as UserRole, title: "Instructor", desc: "Conduct and manage workshops" },
                      ].map((role) => (
                        <button
                          key={role.value}
                          onClick={() => setRegRole(role.value)}
                          className={cn(
                            "w-full p-4 rounded-2xl border text-left transition-all",
                            regRole === role.value
                              ? "border-primary/40"
                              : "border-border hover:border-border/80"
                          )}
                          style={{
                            background: regRole === role.value ? 'hsl(25 90% 55% / 0.08)' : 'hsl(20 6% 9%)',
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-foreground font-semibold text-sm">{role.title}</p>
                              <p className="text-muted-foreground text-xs mt-0.5">{role.desc}</p>
                            </div>
                            {regRole === role.value && (
                              <div className="h-6 w-6 rounded-full flex items-center justify-center" style={{ background: 'hsl(25 90% 55% / 0.15)' }}>
                                <Check className="h-3.5 w-3.5 text-primary" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {regStep === 1 && (
                  <div className="animate-slide-up">
                    <h2 className="text-[26px] font-bold text-white leading-tight mb-2 font-heading">What's your first name?</h2>
                    <p className="text-white/50 text-sm mb-6">So we know what to call you</p>
                    <input ref={inputRef} type="text" className={glassInput}
                      placeholder="First name" value={regFirst} onChange={(e) => setRegFirst(e.target.value)} />
                  </div>
                )}

                {regStep === 2 && (
                  <div className="animate-slide-up">
                    <h2 className="text-[26px] font-bold text-white leading-tight mb-2 font-heading">And your last name?</h2>
                    <p className="text-white/50 text-sm mb-6">Almost there with basics</p>
                    <input ref={inputRef} type="text" className={glassInput}
                      placeholder="Last name" value={regLast} onChange={(e) => setRegLast(e.target.value)} />
                  </div>
                )}

                {regStep === 3 && (
                  <div className="animate-slide-up">
                    <h2 className="text-[26px] font-bold text-white leading-tight mb-2 font-heading">Your email address</h2>
                    <p className="text-white/50 text-sm mb-6">We'll send confirmations here</p>
                    <input ref={inputRef} type="email" className={glassInput}
                      placeholder="you@institution.edu" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
                  </div>
                )}

                {regStep === 4 && (
                  <div className="animate-slide-up">
                    <h2 className="text-[26px] font-bold text-white leading-tight mb-2 font-heading">Choose a username</h2>
                    <p className="text-white/50 text-sm mb-6">This will be your login ID</p>
                    <input ref={inputRef} type="text" className={glassInput}
                      placeholder="Username" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} />
                  </div>
                )}

                {regStep === 5 && (
                  <div className="animate-slide-up">
                    <h2 className="text-[26px] font-bold text-white leading-tight mb-2 font-heading">Create a password</h2>
                    <p className="text-white/50 text-sm mb-6">At least 4 characters</p>
                    <div className="relative">
                      <input ref={inputRef} type={showPassword ? "text" : "password"} className={cn(glassInput, "pr-12")}
                        placeholder="Password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {regStep === 6 && (
                  <div className="animate-slide-up">
                    <h2 className="text-[26px] font-bold text-white leading-tight mb-2 font-heading">Your institution</h2>
                    <p className="text-white/50 text-sm mb-6">College or university name</p>
                    <input ref={inputRef} type="text" className={glassInput}
                      placeholder="e.g. IIT Bombay" value={regInstitution} onChange={(e) => setRegInstitution(e.target.value)} />
                  </div>
                )}

                {regStep === 7 && (
                  <div className="animate-slide-up">
                    <h2 className="text-[26px] font-bold text-white leading-tight mb-2 font-heading">Your department</h2>
                    <p className="text-white/50 text-sm mb-6">Final step — let's go!</p>
                    <input ref={inputRef} type="text" className={glassInput}
                      placeholder="e.g. Computer Science" value={regDepartment} onChange={(e) => setRegDepartment(e.target.value)} />
                  </div>
                )}
              </div>

              <div className="mt-6">
                <Button
                  onClick={handleRegNext}
                  disabled={!canProceed()}
                  className={cn(
                    "h-12 rounded-2xl text-sm font-semibold transition-all",
                    canProceed()
                      ? "text-white"
                      : "text-muted-foreground cursor-not-allowed",
                    regStep === regSteps.length - 1 ? "w-full" : "px-8"
                  )}
                  style={{
                    background: canProceed()
                      ? 'linear-gradient(135deg, hsl(25 90% 55%), hsl(30 85% 50%))'
                      : 'hsl(20 6% 11%)',
                    boxShadow: canProceed() ? '0 4px 20px -4px hsl(25 90% 55% / 0.3)' : 'none',
                  }}
                >
                  {regStep === regSteps.length - 1 ? "Create Account" : <>Continue <ArrowRight className="h-4 w-4 ml-1" /></>}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
