import type { NextPage } from "next";
import React, { useState, FC } from "react";
import ClassCard from "../components/ClassCard";
import CreateClassForm from "../components/CreateClassFrom";
import Header from "../components/Header";

interface Values {
  classname: string,
  subject: string,
}

interface CreateClassFormProps {
  isModalVisible: boolean,
  onCreateClass: (values: Values) => void,
  cancelCreateClassModal: () => void,
}

const Home: NextPage = () => {
  

  return (
    <div>
      <Header />
      {/* <CreateClassForm /> */}

      {/* <div className="flex flex-wrap gap-8 mr-20 ml-20 mt-8">
        {data.map((item, index)=>(
          <div key={index}>
            <ClassCard classInfo={item}/>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Home;

const data = [
  {
    className: "[CQ] PTUDWNC - 18_3",
    subject: "PTUDWNC",
    teacherName: "Nguyen Huy Khanh",
    teacherDepartment: "Faculty of IT - HCMUS",
  },{
    className: "[CQ] PTUDWNC - 18_3",
    subject: "PTUDWNC",
    teacherName: "Nguyen Huy Khanh",
    teacherDepartment: "Faculty of IT - HCMUS",
  },{
    className: "[CQ] PTUDWNC - 18_3",
    subject: "PTUDWNC",
    teacherName: "Nguyen Huy Khanh",
    teacherDepartment: "Faculty of IT - HCMUS",
  },{
    className: "[CQ] PTUDWNC - 18_3",
    subject: "PTUDWNC",
    teacherName: "Nguyen Huy Khanh",
    teacherDepartment: "Faculty of IT - HCMUS",
  },{
    className: "[CQ] PTUDWNC - 18_3",
    subject: "PTUDWNC",
    teacherName: "Nguyen Huy Khanh",
    teacherDepartment: "Faculty of IT - HCMUS",
  },{
    className: "[CQ] PTUDWNC - 18_3",
    subject: "PTUDWNC",
    teacherName: "Nguyen Huy Khanh",
    teacherDepartment: "Faculty of IT - HCMUS",
  }
];
