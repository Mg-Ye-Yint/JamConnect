"use client";

import LanguageOptions from "@/components/dynamics/languageOptions";
import { chooseLanguageStore } from "@/store";
import React from "react";

const page = () => {
  const { chooseLanguages } = chooseLanguageStore((state) => ({
    chooseLanguages: state.chooseLanguage,
  }));

  return (
    <>
      {" "}
      <div className="w-full bg-gray-100 h-[20px] p-1">
        {chooseLanguages ? <LanguageOptions /> : null}
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-800 text-center">
            Privacy Policy
          </h1>
          <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg">
            <p className="text-gray-600 mb-4">
              At MusicianHub, we respect your privacy and are committed to
              protecting it through our compliance with this policy.
            </p>

            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 mb-4">
              We collect several types of information from and about users of
              our website, including information:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>
                By which you may be personally identified, such as name, email
                address, or any other identifier by which you may be contacted
                online or offline.
              </li>
              <li>That is about you but individually does not identify you.</li>
              <li>
                About your internet connection, the equipment you use to access
                our website, and usage details.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 mb-4">
              We use information that we collect about you or that you provide
              to us, including any personal information:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>To present our website and its contents to you.</li>
              <li>
                To provide you with information, products, or services that you
                request from us.
              </li>
              <li>To fulfill any other purpose for which you provide it.</li>
              <li>
                To notify you about changes to our website or any products or
                services we offer or provide through it.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
              Disclosure of Your Information
            </h2>
            <p className="text-gray-600 mb-4">
              We may disclose aggregated information about our users, and
              information that does not identify any individual, without
              restriction. We may disclose personal information that we collect
              or you provide as described in this privacy policy:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>To our subsidiaries and affiliates.</li>
              <li>
                To contractors, service providers, and other third parties we
                use to support our business.
              </li>
              <li>To fulfill the purpose for which you provide it.</li>
              <li>
                For any other purpose disclosed by us when you provide the
                information.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
              Data Security
            </h2>
            <p className="text-gray-600 mb-4">
              We have implemented measures designed to secure your personal
              information from accidental loss and from unauthorized access,
              use, alteration, and disclosure. The safety and security of your
              information also depends on you. Where we have given you (or where
              you have chosen) a password for access to certain parts of our
              website, you are responsible for keeping this password
              confidential.
            </p>

            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
              Changes to Our Privacy Policy
            </h2>
            <p className="text-gray-600 mb-4">
              It is our policy to post any changes we make to our privacy policy
              on this page. If we make material changes to how we treat our
              users&apos; personal information, we will notify you through a
              notice on the website home page. The date the privacy policy was
              last revised is identified at the bottom of the page. You are
              responsible for ensuring we have an up-to-date active and
              deliverable email address for you, and for periodically visiting
              our website and this privacy policy to check for any changes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
