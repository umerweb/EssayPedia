


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold font">EssayPedia</h2>
            <p className="text-sm">Unraveling Perspectives One Essay at a Time.</p>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">
              Home
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">
              About
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">
              Services
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">
              Contact
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">
            Terms of Service
          </a>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">
            <p>icon</p>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">
              <p>icon</p>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">
              <p>icon</p>
            </a>
          </div>
        </div>
        <hr className="my-8 border-gray-700" />
        <div className="text-sm text-center">
          &copy; {new Date().getFullYear()} EssayPedia. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
