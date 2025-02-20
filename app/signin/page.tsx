export default function SignIn() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-color1">
        <div className="bg-color4 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
          <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
  
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-color1 text-white border border-gray-600 focus:border-color3 outline-none"
              placeholder="Enter your username"
            />
          </div>
  
          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-color1 text-white border border-gray-600 focus:border-color3 outline-none"
              placeholder="Enter your password"
            />
          </div>
  
          {/* Sign In Button */}
          <button className="w-full bg-color3 text-white py-3 rounded-lg font-semibold hover:bg-color2 transition">
            Sign In
          </button>
  
          {/* Divider */}
          <div className="my-6 flex items-center justify-center">
            <div className="w-1/3 border-b border-gray-500"></div>
            <span className="mx-4 text-sm text-gray-300">OR</span>
            <div className="w-1/3 border-b border-gray-500"></div>
          </div>
  
          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center bg-color2 text-white py-3 rounded-lg hover:bg-color3 transition">
              <span className="mr-2">🔵</span> Sign in with Google
            </button>
            <button className="w-full flex items-center justify-center bg-color3 text-white py-3 rounded-lg hover:bg-color2 transition">
              <span className="mr-2">🐙</span> Sign in with GitHub
            </button>
          </div>
        </div>
      </div>
    );
  }
  