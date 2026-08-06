const Navbar = () => {
  return (
    <nav className="w-full px-48 py-5 bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] flex justify-between items-center">
      {/* Logo */}
      <div className="w-[52px] h-[52px] sm:w-[52px] sm:h-[52px]">
        <img src="./images/logo.png" alt="Logo" className="w-full h-full object-contain" />
    </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-14">
        <a href="#" className="text-cyan-700 text-base font-semibold font-['Wix_Madefor_Text'] leading-5">Home</a>
        <a href="#" className="text-gray-500 text-base font-medium font-['Wix_Madefor_Text'] leading-5">Services</a>
        <a href="#" className="text-gray-500 text-base font-medium font-['Wix_Madefor_Text'] leading-5">Find Care</a>
        <a href="#" className="text-gray-500 text-base font-medium font-['Wix_Madefor_Text'] leading-5">Jobs</a>
        <a href="#" className="text-gray-500 text-base font-medium font-['Wix_Madefor_Text'] leading-5">Agencies</a>
        <a href="#" className="text-gray-500 text-base font-medium font-['Wix_Madefor_Text'] leading-5">Marketplace</a>
        <a href="#" className="text-gray-500 text-base font-medium font-['Wix_Madefor_Text'] leading-5">Membership</a>
      </div>

      {/* Actions */}
      <div className="flex justify-start items-center">
        <button className="px-8 py-4 rounded-lg flex justify-center items-center gap-2.5">
          <span className="text-center text-cyan-700 text-base font-medium font-['Wix_Madefor_Text'] leading-5">Sign In</span>
        </button>

        <button className="px-8 py-4 bg-cyan-700 rounded-lg outline-[1.50px] outline-offset-[-1.50px] flex justify-center items-center gap-2.5">
          <span className="text-center text-neutral-100 text-base font-medium font-['Wix_Madefor_Text'] leading-5">Join Free</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;