import React from "react";
import { createPopper } from "@popperjs/core";
import { useAppSelector } from "app/hooks";
import { selectUser } from "features/user/userSlice";

const UserDropdown = () => {
  // dropdown props
//   const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
//   const closeDropdownPopover = () => {
//     setDropdownPopoverShow(false);
//   };
  const user = useAppSelector(selectUser);

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        // onClick={(e) => {
        //   e.preventDefault();
        //   dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        // }}
      >
        <div className="items-center flex">
          <span className="w-10 h-10 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={user.photoUrl}
            />
          </span>
        </div>
      </a>
     
    </>
  );
};

export default UserDropdown;
