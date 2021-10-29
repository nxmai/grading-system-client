/* eslint-disable @next/next/no-img-element */
import React, { useState, FC } from "react";
import { Card, Avatar } from "antd";
import { FileProtectOutlined } from "@ant-design/icons";

const { Meta } = Card;

interface ClassCardProps {
  classInfo: any;
}

const ClassCard: FC<ClassCardProps> = ({ classInfo }) => {
  return (
    <Card
      style={{ width: 300 }}
      actions={[
        <FileProtectOutlined key="classActivity" />,
        <FileProtectOutlined key="classActivity" />,
      ]}
      className="cursor-pointer"
      cover={
        <img
          className="h-28"
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <Meta title={classInfo.className} description={classInfo.subject} />
      <hr className="mt-3 mb-3" />
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={classInfo.teacherName}
        description={classInfo.teacherDepartment}
      />
    </Card>
  );
};

export default ClassCard;
