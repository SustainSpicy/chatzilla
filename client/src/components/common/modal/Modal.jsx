import React, { useState } from "react";
import { CloseIcon } from "../../svgIcons";
import { Wrapper } from "./modal.styles";

const Modal = ({ open, children, closeModal }) => {
  // const [isOpen, setisOpen] = useState(open);

  if (open)
    return (
      <Wrapper>
        <div className="header">
          <CloseIcon onClick={closeModal} />
        </div>
        {children}
      </Wrapper>
    );
};

export default Modal;
