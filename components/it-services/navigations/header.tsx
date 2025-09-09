"use client"

import {  useState } from "react"
import { Button } from "@/components/ui/button"
import { Grid2X2, Menu, Search, User, Settings, HelpCircle, LogOut, Wallet2, Logs } from "lucide-react"
import { CategoriesDropdown } from "./categories-dropdown"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function Header() {
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isSellerMode, setIsSellerMode] = useState(true) // true = seller mode, false = buyer mode

  const handleSwitchMode = () => {
    if (isSellerMode) {
      // Currently in seller mode, switching to buyer - do nothing
      setIsSellerMode(false)
      router.push('/it-services/search/')
    } else {
      // Currently in buyer mode, switching to seller - redirect
      setIsSellerMode(true)
      router.push('/it-services/seller/')
    }
  }

  return (
    <header className="bg-emerald-800 text-white relative">
      <div className="max-w-7xl mx-auto  py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-emerald-800 font-bold text-sm">S</span>
              </div>
              <Link href="/it-services/" className="text-xl font-bold">
                Servicyee
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <div className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                 <button className="hover:text-emerald-200 flex items-center space-x-1 py-2 px-3 rounded-lg hover:bg-emerald-700 transition-colors">
                  <Grid2X2 className="w-4 h-4" />
                  <span>Categories</span>
                  <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <CategoriesDropdown isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
              </div>
              <Link href="/it-services/search/" className="hover:text-emerald-200">
                Browse 
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* lg+ full search input */}
            <div className="hidden lg:flex items-center relative">
              <Input
                type="search"
                placeholder="Search services"
                className="w-80 xl:w-96 bg-white/90 text-gray-900 pr-9"
              />
              <Search className="w-4 h-4 text-emerald-900 absolute right-3" />
            </div>
            {/* md-only search icon with popover */}
            <div className="hidden md:flex lg:hidden items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <button aria-label="Open search" className="p-2 rounded-md hover:bg-emerald-700 transition-colors">
                    <Search className="w-5 h-5 text-white" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" side="top" className="p-2 w-80">
                  <div className="relative">
                    <Input
                      autoFocus
                      type="search"
                      placeholder="Search services"
                      className="w-full bg-white/90 text-gray-900 pr-9"
                    />
                    <Search className="w-4 h-4 text-emerald-900 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Link href={'/it-services/become-seller/'}>
              <span className="hidden md:inline">Become a Seller</span>
            </Link>
            {/* Sign In Button or User Profile Dropdown */}
            {!isSignedIn ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsSignedIn(true)}
              >
                Sign In
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border-2 border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                    <Image 
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face" 
                      alt="User profile" 
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <Image 
                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face" 
                        alt="User profile" 
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">John Doe</div>
                        <div className="text-sm text-gray-500">john.doe@example.com</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Switch Button */}
                  <div className="px-4 py-3">
                    <button
                      onClick={handleSwitchMode}
                      className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    >
                      {isSellerMode ? "Switch to Buyer" : "Switch to Seller"}
                    </button>
                  </div>
                  
                  <DropdownMenuItem className="flex items-center space-x-3 px-4 py-2.5 cursor-pointer"
                    onClick={()=>{
                      router.push('/it-services/buyer-profile/')
                    }}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-3 px-4 py-2.5 cursor-pointer"
                  onClick={()=>{
                    router.push('/it-services/buyer/orders/')
                  }}
                  >
                    <Logs  className="w-4 h-4" />
                    <span>Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-3 px-4 py-2.5 cursor-pointer"
                   onClick={()=>{
                    router.push('/it-services/buyer/wallet/')
                  }}
                  >
                    <Wallet2 className="w-4 h-4" />
                    <span>Wallet</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-3 px-4 py-2.5 cursor-pointer"
                      onClick={()=>{
                        router.push('/it-services/buyer/settings/')
                      }}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-3 px-4 py-2.5 cursor-pointer">
                    <HelpCircle className="w-4 h-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex items-center space-x-3 px-4 py-2.5 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    onClick={() => setIsSignedIn(false)}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Button className="md:hidden" variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
