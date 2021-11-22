import UserMenu from "components/user/UserMenu";
import React, { Fragment } from "react";
import Image from 'next/image';
import "./style.module.css";

export default function UserMe() {
  const myLoader = () => {
    return "https://images.unsplash.com/photo-1637352532486-4046253f49b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
  };

    return (
        <div >
        <section className="py-8 bg-red">
          <div className="container mx-auto px-4 bg-red">
            <div className="flex flex-col min-w-0 break-words bg-red w-full shadow-xl rounded-lg mt-8">
              <div className="px-6">
                <div className="flex flex-wrap justify-center w-full">
                  <div className="lg:w-4/12 px-4 lg:order-1">
                  </div>
                  <div className="lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <Image
                        alt="..."
                        loader={myLoader}
                        width={100} height={100}
                        src="/"
                        layout="intrinsic"
                        className="rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                      />
                    </div>
                  </div>
                  <div className="lg:w-4/12 px-4 lg:order-3 text-right lg:self-center">
                    <div className="py-6 px-3 sm:mt-0">
                      <UserMenu/>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                    Phamj Vawn Minh Nhutwj
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                    18120499
                  </div>
                  <div className="mb-2 text-gray-700 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                    phamnhut21@gmail.com
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        Request to join Doodle ClassRoom
                      </p>
                      <a
                        href="#pablo"
                        className="font-normal text-main"
                        onClick={e => e.preventDefault()}
                      >
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
    );
}