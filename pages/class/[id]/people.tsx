import React, { useEffect, useState, FC } from "react";
import classApi from "../../../api/classes";
import Header from "../../../components/Header";
import { useRouter } from "next/router";

interface InformationProps {
  firstName: String;
  lastName: String;
}

const PeopleRow: FC<InformationProps> = ({ firstName, lastName }) => {
  return (
    <div className="flex items-center gap-4 p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-[#5F6368]"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
          clipRule="evenodd"
        />
      </svg>
      <p>{firstName} {lastName}</p>
    </div>
  );
};

const ClassPeople = () => {
  const router = useRouter();
  const { id } = router.query;

  const [teacherList, setTeacherList] = useState([]);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    async function getTeachers() {
      try {
        const res = await classApi.getTeachersInClass(id);
        console.log(res.data);
        setTeacherList(res?.data);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    async function getStudents() {
      try {
        const res = await classApi.getStudentsInClass(id);
        setStudentList(res?.data);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    getTeachers();
    getStudents();
  }, [id]);

  return (
    <>
      <Header />
      <div className="w-[760px] ml-[calc(50%-380px)] mr-[calc(50%-380px)]">
        <section className="mt-4">
          <p className="text-3xl text-blue-700 pb-4 pt-4">Teachers</p>
          <hr className="border-blue-600" />
          {teacherList?.map((teacher: any, index) => (
            <div key={index}>
              <PeopleRow
                firstName={teacher?.firstName}
                lastName={teacher?.lastName}
              />
              <hr />
            </div>
          ))}
        </section>
        <section className="mt-4">
          <p className="text-3xl text-blue-700 pb-4 pt-4">Students</p>
          <hr className="border-blue-600" />
          {studentList?.map((student: any, index) => (
            <div key={index}>
              <PeopleRow
                firstName={student?.firstName}
                lastName={student?.lastName}
              />
              <hr />
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default ClassPeople;
