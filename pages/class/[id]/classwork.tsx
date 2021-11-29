import React, { useEffect, useState, FC, Fragment } from "react";
import Header from "components/Header";

export default function ClassWork() {
    return (
        <Fragment>
            <Header />
            <div className="w-[760px] ml-[calc(50%-380px)] mr-[calc(50%-380px)]">
                classwork
            </div>
        </Fragment>
    );
};
