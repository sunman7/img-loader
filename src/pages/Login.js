import React, {useRef} from "react";
import {observer} from "mobx-react";
import {useStore} from "../stores";

const Component = observer(() => {
    const {AuthStore} = useStore();
    const inputRef = useRef();
    const bindChange = () => {
        console.log(inputRef.current.value);
        AuthStore.setUsername(inputRef.current.value);
    };

    return (
        <>
            <h1>login:{AuthStore.values.username}</h1>
            <input onChange={bindChange} ref={inputRef}/>
        </>
    );
});


export default Component;