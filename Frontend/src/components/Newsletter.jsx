import React from 'react'

const Newsletter = () => {
  return (
    <div className="bg-gray-100 font-[sans-serif] p-4">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-xl font-bold text-gray-900 sm:text-3xl">Newsletter</h3>
        <p className="text-gray-600 text-sm mt-6">Subscribe to our newsletter and stay up to date with the latest news,
          updates, and exclusive offers. Get valuable insights. Join our community today!</p>

        <div className="max-w-lg mx-auto bg-gray-200 flex p-1 rounded-full text-left border focus-within:border-blue-600 focus-within:bg-transparent mt-12">
          <input type='email' placeholder='Enter your email' className="text-gray-800 w-full outline-none bg-transparent text-sm px-4 py-3" />
          <button type='button'
            className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold text-sm rounded-full px-6 py-3">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Newsletter