import { FaHeart } from "react-icons/fa"; // Heart icon

export default function WishlistEmpty() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">
          <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center bg-white shadow-md">
            <FaHeart className="text-gray-500" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Your wishlist is empty</h3>
        <p className="text-sm text-gray-500 mb-6">Looks like you have not added anything to your wishlist yet.</p>
        <button className="bg-green-600 text-white py-2 px-8 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
