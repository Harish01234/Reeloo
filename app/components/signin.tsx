"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result?.error) {
        router.push("/login");
      }

      router.push("/reels");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setGithubLoading(true);
    try {
      await signIn("github", { callbackUrl: "/reels" }).then((res) => {
        
        console.log('github response',res);
        
        
      })
    } finally {
      setGithubLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-color1">
      
      <div className="w-full max-w-md space-y-8 p-8 rounded-lg shadow-lg bg-color2">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-color4">
            Welcome Back
          </h1>
          <p className="mt-2 text-color4">
            Please sign in to continue
          </p>
        </div>

        <button
          onClick={handleGithubLogin}
          disabled={githubLoading}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-lg transition-colors disabled:opacity-50 bg-color4 text-color1 hover:bg-color3"
        >
          {githubLoading ? (
            "Loading..."
          ) : (
            <>
              <GitHubIcon />
              Continue with GitHub
            </>
          )}
        </button>

        <div className="flex items-center gap-4">
          <hr className="flex-1 border-t-2 border-color4" />
          <span className="text-color4">OR</span>
          <hr className="flex-1 border-t-2 border-color4" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-color4">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-color3 focus:outline-none focus:border-color4"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-medium text-color4">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-color3 focus:outline-none focus:border-color4"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 bg-color3 text-color1 hover:bg-color4"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-color4">
          Don&apos;t have an account?{" "}
          <Link 
            href="/signup" 
            className="font-semibold hover:underline text-color4 hover:text-color3"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}