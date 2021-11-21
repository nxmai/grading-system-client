import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import {useRouter} from 'next/router';
import classApi from '../../../api/classes';

const ClassDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [classData, setClassData] = useState({name: '', subject: ''});

  useEffect(() => {
    async function getClass() {
      try{
        const res = await classApi.getClassById(id);
        setClassData({...res?.data});
      }catch(error: any){
        console.log(error.message);
      }
    }

    getClass();
  }, [id]);

  return (
    <>
      <Header />
      <div className="ml-[calc(50%-500px)] mr-[calc(50%-500px)] mt-6 ">
        <section className="flex relative h-[240px] w-[1000px] ">
          <div className="h-[240px] w-[1000px] bg-blue-500 absolute z-[-1]"></div>
          <div className="mb-0 mt-auto pl-6 pb-6">
            <p className="text-4xl font-bold text-white">{classData.name}</p>
            <p className="text-2xl font-semibold text-white">{classData.subject}</p>
          </div>
        </section>
        <section>asdf</section>
      </div>
      
    </>
  );
};

export default ClassDetail;