import React from "react";
import {Form, Input, Button} from "antd";
import styled from "styled-components";
import {useStore} from "../stores";
import {useHistory} from "react-router-dom";


const RegisterButton = styled(Button)`
  width: 100%;
  background: #fff;
  border: #6C757D 1px solid;
  color:#6C757D;
  &:hover{
    background: #6C757D;
    border: none;
  }
`;
const Wraper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;


const Component = () => {
    const {AuthStore} = useStore();
    const history = useHistory();

    const onFinish = values => {
        console.log("Success:", values);
        AuthStore.setUsername(values.username);
        AuthStore.setPassword(values.password);
        AuthStore.register()
            .then(() => {
                history.push("/");
            }).catch(() => {
            console.log("注册失败，什么都不做");
        });
    };

    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    };

    const validateUsername = (rule, value) => {
        if (/\W/.test(value)) return Promise.reject("只能是字母数字下划线");
        if (value.length < 4 || value.length > 20) return Promise.reject("长度为4～10个字符");
        return Promise.resolve();
    };

    const validateConfirm = ({getFieldValue}) => ({
        validator(rule, value) {
            if (getFieldValue("password") === value) return Promise.resolve();
            return Promise.reject("两次密码不一致");
        }
    });


    return (
        <Wraper>
            <Title>注册</Title>
            <Form

                layout="vertical"
                size="large"
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "输入用户名",
                        },
                        {
                            validator: validateUsername
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "输入密码",
                        },
                        {
                            min: 4,
                            message: "最少4个字符"
                        },
                        {
                            max: 20,
                            message: "最大20个字符"
                        }
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    label="确认密码"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: "再次确认密码",
                        },
                        validateConfirm
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item>
                    <RegisterButton type="primary" htmlType="submit">
                        注册
                    </RegisterButton>
                </Form.Item>
            </Form>
        </Wraper>
    );
};

export default Component;