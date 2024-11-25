const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto flex justify-between items-center flex-col sm:flex-row">
        <div className="text-lg font-semibold mb-4 sm:mb-0">
          <span>© 2024 City Cart. All rights reserved.</span>
        </div>

        <div className="text-center sm:text-left max-w-md">
          <p className="mb-2">
            Are you a local business or a company looking to showcase your
            products or services? Join our platform and reach more customers!
          </p>
          <p>
            By listing your products with us, you get access to a growing
            community of customers actively looking for quality services and
            products in your area. Let us help you grow your business!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
