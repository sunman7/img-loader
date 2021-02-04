import React, {useRef} from "react";
import {useStore} from "../stores";
import {observer} from "mobx-react";
import {Upload, message} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {useLocalStore} from "mobx-react-lite";

const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
 
`;
const H1 = styled.h1`
  margin: 20px 0;
  text-align: center;
`;
const Img = styled.img`
  max-width: 300px;
`;
const Component = observer(() => {
        const {Dragger} = Upload;
        const {ImageStore, UserStore} = useStore();
        const widthRef = useRef();
        const heightRef = useRef();
        const store = useLocalStore(() => ({
            width: null,
            height: null,
            setWidth(width) {
                store.width = width;
            },
            setHeight(height) {
                store.height = height;
            },
            get widthStr() {
                return store.width ? `/w/${store.width}` : "";
            },
            get heightStr() {
                return store.height ? `/h/${store.height}` : "";
            },
            get fullStr() {
                return ImageStore.serverFile.attributes.url.attributes.url + "?imageView2/0" + store.widthStr + store.heightStr;
            }

        }));
        const bindWidthChange = () => {
            console.log("width");
            store.setWidth(widthRef.current.value);
        };
        const bindHeightChange = () => {
            console.log("height");
            store.setHeight(heightRef.current.value);
        };
        const props = {
            showUploadList: false,
            beforeUpload: file => {
                ImageStore.setFile(file);
                ImageStore.setFilename(file.name);
                if (UserStore.currentUser === null) {
                    message.warning("请先登录之后再上传图片！");
                    return false;
                }
                ImageStore.upload()
                    .then((serverFile) => {
                        console.log("上传成功");
                        console.log(serverFile);
                    }).catch(() => {
                    console.log("上传失败");
                });
                return false;
            }
        };

        return (
            <div>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>
                {ImageStore.serverFile ?
                    <Result>
                        <H1>上传结果</H1>
                        <dl>
                            <dt>完整路径</dt>
                            <dd><a target="_blank"
                                   href={ImageStore.serverFile.attributes.url.attributes.url}>{ImageStore.serverFile.attributes.url.attributes.url}</a>
                            </dd>
                            <dt>文件名</dt>
                            <dd>{ImageStore.filename}</dd>
                            <dt>图片预览</dt>
                            <dd>
                                <Img src={ImageStore.serverFile.attributes.url.attributes.url} alt=""/>
                            </dd>
                            <dt>更多尺寸</dt>
                            <dd>
                                <input type="text" onChange={bindWidthChange} ref={widthRef} placeholder="宽度（选填）"/>
                                <input type="text" onChange={bindHeightChange} ref={heightRef} placeholder="高度（选填）"/>
                            </dd>
                            <dt>定制图片预览地址</dt>
                            <dd>
                                <a target="_blank" href={store.fullStr}>{store.fullStr}</a>
                            </dd>
                        </dl>
                    </Result> : null}
            </div>
        );
    })
;
export default Component;