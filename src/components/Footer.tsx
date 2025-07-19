import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1a1a] text-[#e5e5e5] p-[48px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-5 gap-[32px]">
          {/* Left Section - Join Community & Contact Us */}
          <div className="col-span-2 space-y-[32px]">
            {/* JOIN THE COMMUNITY */}
            <div>
              <h3 className="text-[#ffffff] font-bold text-[18px] mb-[16px]">
                JOIN THE COMMUNITY
              </h3>
              <p className="text-[#777] text-[14px] mb-[16px]">
                Be the first one to receive our new releases, special offers and
                more.
              </p>
              <div className="flex gap-[8px]">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-[#ffffff] text-[#1a1a1a] p-[12px] text-[14px] border-none outline-none"
                />
                <button className="bg-transparent text-[#777] underline text-[14px] px-[16px] py-[12px] border border-[#777] hover:bg-[#e5e5e5] hover:text-[#1a1a1a] transition-colors duration-300 cursor-pointer">
                  Sign Me Up
                </button>
              </div>
            </div>

            {/* CONTACT US */}
            <div>
              <h3 className="text-[#ffffff] font-bold text-[18px] my-[16px]">
                CONTACT US
              </h3>

              {/* Chat */}
              <div className="mb-[16px]">
                <p className="text-[#ffffff] font-bold text-[14px] mb-[4px]">
                  Chat
                </p>
                <p className="text-[#777] text-[14px] mb-[8px]">
                  Monday - Sunday 9:00am - 18:00pm CST
                </p>
                <p className="text-[#777] underline text-[14px] border border-[#777] inline-block px-[12px] py-[6px] hover:bg-[#fff] hover:text-[#000] transition-colors duration-300 cursor-pointer">
                  Chat with us
                </p>
              </div>

              {/* Email */}
              <div className="mb-[16px]">
                <p className="text-[#ffffff] font-bold text-[14px] mb-[4px]">
                  Email
                </p>
                <p className="text-[#777] text-[14px] mb-[8px]">
                  support@popmart.com
                </p>
                <p className="text-[#777] underline text-[14px] border border-[#777] inline-block px-[12px] py-[6px] hover:bg-[#fff] hover:text-[#000] transition-colors duration-300 cursor-pointer">
                  Email us
                </p>
              </div>

              <p className="text-[#777] underline text-[14px] mb-[16px] hover:text-[#fff] transition-colors duration-300 cursor-pointer w-fit">
                Visit Help Center (FAQs)
              </p>

              {/* Country Selector */}
              <div>
                <p className="text-[#777] text-[14px] mb-[8px]">
                  CHANGE COUNTRY/REGION
                </p>
                <div className="border border-[#777] inline-flex items-center gap-[8px] px-[12px] py-[8px]">
                  <span className="text-[16px]">🇦🇺</span>
                  <span className="text-[#ffffff] font-bold text-[14px]">
                    AU
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sections */}

          {/* HELP */}
          <div>
            <h3 className="text-[#ffffff] font-bold text-[18px] mb-[16px]">
              HELP
            </h3>
            <div className="space-y-[8px]">
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                FAQs
              </p>
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                Terms & Conditions
              </p>
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                Privacy Policy
              </p>
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                Shipping Policy
              </p>
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                Returns & Refunds
              </p>
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                Track your order
              </p>
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                POP BLOCKS after-sales
              </p>
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                Order Status
              </p>
            </div>
          </div>

          {/* INFORMATION */}
          <div>
            <h3 className="text-[#ffffff] font-bold text-[18px] mb-[16px]">
              INFORMATION
            </h3>
            <div className="space-y-[8px]">
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                Store
              </p>
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                About us
              </p>
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                Investor Relations
              </p>
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                Contact us
              </p>
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                Global Ambassador
              </p>
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                News
              </p>
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                Stamps Event
              </p>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="text-[#ffffff] font-bold text-[18px] mb-[16px]">
              SHOP
            </h3>
            <div className="space-y-[8px]">
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                All Blind Box
              </p>
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                All Figures
              </p>
              <p className="text-[#777] text-[14px] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                Accessories
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
