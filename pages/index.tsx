import type { NextPage } from "next";
import React, { useState, FC } from "react";
import { PageHeader, Modal, Form, Input } from "antd";
import { PlusOutlined, MenuOutlined } from "@ant-design/icons";
import ClassCard from "../components/ClassCard";

interface Values {
  classname: string,
  subject: string,
}

interface CreateClassFormProps {
  isModalVisible: boolean,
  onCreateClass: (values: Values) => void,
  cancelCreateClassModal: () => void,
}

const CreateClassForm: FC<CreateClassFormProps> = ({
  isModalVisible, onCreateClass, cancelCreateClassModal,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
        visible={isModalVisible}
        onCancel={cancelCreateClassModal}
        onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreateClass(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
        okText="Create"
      >
        <Form form={form} name="createFormInModal" layout="vertical">
          <Form.Item
            label="Class Name"
            name="classname"
            rules={[
              {
                required: true,
                message: "Please input your class name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Subject" name="subject">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
  );
};

const Home: NextPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showCreateClassModal = () => {
    setIsModalVisible(true);
  };

  const cancelCreateClassModal = () => {
    setIsModalVisible(false);
  };

  const onCreateClass = (formData: any) => {
    console.log(formData);
  };

  return (
    <div>
      <PageHeader
        title="Doodle Classroom"
        subTitle="Manage your class easily!!"
        backIcon={<MenuOutlined />}
        onBack={() => null}
        extra={[
          <PlusOutlined
            key="1"
            className="text-2xl cursor-pointer"
            onClick={showCreateClassModal}
          />,
        ]}
        className="border border-gray-200"
      />
      <CreateClassForm
        isModalVisible={isModalVisible}
        onCreateClass={onCreateClass}
        cancelCreateClassModal={cancelCreateClassModal}
      />

      
      <div className="flex flex-wrap gap-8 mr-20 ml-20 mt-8">
        {data.map((item, index)=>(
          <div key={index}>
            <ClassCard classInfo={item}/>
          </div>
        ))}
      </div>
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
