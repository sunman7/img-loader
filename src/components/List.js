import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useStore} from "../stores";
import InfiniteScroll from "react-infinite-scroller";
import {List, Spin} from "antd";
import styled from "styled-components";

const Img = styled.img`
  width:100px;
  height: 120px;
  object-fit:contain;
  border: 1px solid #eee;
`;
const P = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
const Component = observer(() => {
    const {HistoryStore} = useStore();
    const loadMore = () => {
        HistoryStore.find();
    };
    useEffect(() => {
        return () => {
            HistoryStore.reset();
        };
    }, []);
    return (
        <InfiniteScroll
            initialLoad={true}
            pageStart={0}
            loadMore={loadMore}
            hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
            useWindow={true}
        >
            <List
                dataSource={HistoryStore.list}
                renderItem={item => (
                    <List.Item key={item.id}>
                        <div>
                            <Img src={item.attributes.url.attributes.url} style={{width: "100px"}} alt=""/>
                        </div>
                        <div><P>{item.attributes.filename}</P></div>
                        <div>
                            <a href={item.attributes.url.attributes.url}>预览图片</a>
                        </div>
                    </List.Item>
                )}
            >
                {HistoryStore.isLoading && HistoryStore.hasMore && (
                    <Spin/>
                )}
            </List>
        </InfiniteScroll>
    );
});
export default Component;