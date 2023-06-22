import React from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import Uploader from "../../component/uploader/uploader";


const { Header, Content, Footer } = Layout;

const ImageLocalization: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="layout">
            <Header style={{ display: 'flex', alignItems: 'center', background: '#FFF'}}>
                <div className="demo-logo" >
                    <h3>Musicminion Tool</h3>
                </div>
            </Header>
            <Content style={{ padding: '0 50px',  }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Zip</Breadcrumb.Item>
                    <Breadcrumb.Item>在线Zip压缩</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content" style={{ background: colorBgContainer, padding:'10px', minHeight: '74vh' }}>
                    <div>
                        <h3>在线Zip压缩工具</h3>
                        <p>所有操作均在本地进行，请不要上传过大的文件</p>
                    </div>
                    <div style={{minHeight: '60vh'}}>
                        <Uploader />
                    </div>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Musicminion ©2023 Created by Love!</Footer>
        </Layout>
    );
};

export default ImageLocalization;