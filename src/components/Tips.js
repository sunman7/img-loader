import React from "react";
import {useStore} from "../stores";
import {observer} from "mobx-react";
import styled from "styled-components";

const Tips = styled.div
    `
  background: orange;
  padding:10px;
  margin: 30px 0;
  color: #fff;
  border-radius: 4px;
`;

const Component = observer(({children}) => {
    const {UserStore} = useStore();
    return (
        <>
            {
                UserStore.currentUser ? null : <Tips>{children}</Tips>
            }
        </>
    );
});
export default Component;