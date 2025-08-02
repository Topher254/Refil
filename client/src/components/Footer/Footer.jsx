export default function Footer() {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
               
                <span className="text-2xl font-bold text-gray-800">Refil</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We deliver Gas and Water straight to your door. Trusted by hundreds, we aim to make your life experience simple and affordable.
              </p>
            </div>
  
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                    Offers & Deals
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
  
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Need help?</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                    Delivery Information
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                    Return & Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                    Payment Methods
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                    Track your Order
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
  
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Follow Us</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-500 transition-colors">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          <div className="border-t border-gray-300 mt-12 pt-8">
            <div className="text-center">
              <p className="text-gray-600">
                Copyright {currentYear} © Refil. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }