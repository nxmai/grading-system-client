import React from 'react';
import Header from '../../../components/Header';
import {useRouter} from 'next/router';

const ClassDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Header />
      <div className="ml-[calc(50%-500px)] mr-[calc(50%-500px)] mt-6 ">
        <section className="flex relative h-[240px] w-[1000px] ">
          <div className="h-[240px] w-[1000px] bg-blue-500 absolute z-[-1]"></div>
          <div className="mb-0 mt-auto pl-6 pb-6">
            <p className="text-4xl font-bold text-white">[CQ] PTUDWNC - 18_3</p>
            <p className="text-2xl font-semibold text-white">PTUDWNC</p>
          </div>
        </section>
        <section>asdf</section>
      </div>
      
    </>
  );
};

export default ClassDetail;
