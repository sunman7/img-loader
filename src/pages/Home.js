import React from "react";
import {observer} from "mobx-react";
import {useStore} from "../stores";
import Uploader from "../components/Uploader";
import Tips from "../components/Tips";

const Home = observer(() => {
    const {UserStore} = useStore();
    return (
        <>
           <Tips>请先登录</Tips>
            <Uploader/>
        </>
    );
});

export default Home;