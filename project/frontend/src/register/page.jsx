// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Eye, EyeOff } from "lucide-react"

// export default function RegisterPage() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Handle registration logic here
//     console.log("Registration with:", formData)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <Link href="/" className="flex justify-center">
//           <span className="text-3xl font-bold text-amber-700">Brijwasi</span>
//         </Link>
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
//         <p className="mt-2 text-center text-sm text-gray-600">Join Brijwasi for exclusive benefits and offers</p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                 Full Name
//               </label>
//               <div className="mt-1">
//                 <Input
//                   id="name"
//                   name="name"
//                   type="text"
//                   autoComplete="name"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="h-10"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="h-10"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                 Phone Number
//               </label>
//               <div className="mt-1">
//                 <Input
//                   id="phone"
//                   name="phone"
//                   type="tel"
//                   autoComplete="tel"
//                   required
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="h-10"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1 relative">
//                 <Input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   autoComplete="new-password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="h-10 pr-10"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//               </div>
//               <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
//             </div>

//             <div className="flex items-center">
//               <Checkbox id="terms" required />
//               <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
//                 I agree to the{" "}
//                 <Link href="/terms" className="font-medium text-amber-700 hover:text-amber-500">
//                   Terms of Service
//                 </Link>{" "}
//                 and{" "}
//                 <Link href="/privacy" className="font-medium text-amber-700 hover:text-amber-500">
//                   Privacy Policy
//                 </Link>
//               </label>
//             </div>

//             <div>
//               <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800">
//                 Create Account
//               </Button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">Already have an account?</span>
//               </div>
//             </div>

//             <div className="mt-6">
//               <Link href="/login">
//                 <Button
//                   type="button"
//                   className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
//                   variant="outline"
//                 >
//                   Sign in
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

