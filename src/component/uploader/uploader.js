import React, {useRef, useState} from 'react';
import { InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { Button, Form, Input, Space } from 'antd';
import JSZip from "jszip";
const { Dragger } = Upload;


const dealUploadFile = (e) => {
    // console.log("dealUploadFile")
    e.onProgress({ percent: 100 });
    e.onSuccess();
}



const Uploader = () => {
    const uploadRef = useRef(null);

    const DownloadZip = () => {
        // console.log("DownloadZip")
        let zip = new JSZip();
        // 遍历 uploadRef.current.fileList
        // console.log("uploadRef.current.fileList: " + uploadRef.current.fileList)
        for (let i = 0; i < uploadRef.current.fileList.length; i++) {
            let file = uploadRef.current.fileList[i]
            let fileRelativePath = file.originFileObj.webkitRelativePath

            // 检查zip文件中是否已经存在目录
            fileRelativePath.substring(0, fileRelativePath.lastIndexOf("/"))
            let dirName = fileRelativePath.substring(0, fileRelativePath.lastIndexOf("/"))
            // console.log("dirName: " + dirName)
            if(dirName !== "") {
                if(zip.folder(dirName) === null) {
                    zip.folder(dirName)
                }
            }

            zip.file(fileRelativePath, file.originFileObj)
        }

        // 生成 ZIP 压缩文件
        zip.generateAsync({ type: 'blob' }).then((content) => {
            // 创建下载链接元素
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            // 根据时间戳生成文件名
            // downloadFileName =
            link.download = "result-" + new Date().getTime().toLocaleString() + '.zip';

            // 将链接添加到页面中并模拟点击
            document.body.appendChild(link);
            link.click();

            // 清理 URL 对象
            URL.revokeObjectURL(link.href);
        });

    }

    const ClearAll = () => {
        window.location.reload()
    }

    const props = {
        name: 'file',
        multiple: true,
        directory: true,
        ref: uploadRef,
        customRequest: dealUploadFile,
        // maxCount: 1,
        // onChange(info) {
        //     const { status } = info.file;
        //     if (status !== 'uploading') {
        //         // console.log(info.file, info.fileList);
        //     }
        //     if (status === 'done') {
        //         // message.success(`${info.file.name} file uploaded successfully.`).then(r => console.log(r));
        //     } else if (status === 'error') {
        //         // message.error(`${info.file.name} file upload failed.`).then(r => console.log(r));
        //     }
        // },
        // onDrop(e) {
        //     // console.log('Dropped files', e);
        // },
    };


    return (
        <>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">单击或者拖动文件到这里</p>
                <p className="ant-upload-hint">
                    请将你要压缩的文件上传，我们会"离线"处理你的文件，生成一个可供下载的zip文件
                </p>
            </Dragger>

            <h4>操作区域</h4>
            <div>
                <Space>
                    <Form.Item>
                        <Button type="primary" danger onClick={ClearAll}>
                            清空全部
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" onClick={DownloadZip}>
                            下载保存
                        </Button>
                    </Form.Item>
                </Space>

            </div>
        </>


    )
}

export default Uploader


const onFinish = (values) => {
    // console.log('Received values of form:', values);
};


//
// // 处理Markdown的文件
// const dealMDFile = (e) => {
//     console.log("dealMDFile")
//     console.log(e)
//     const reader = new FileReader();
//
//     reader.onload = (event) => {
//         const contents = event.target.result;
//         const fileNamePrefix = e.file.name.split('.')[0]
//         const lines = contents.split('\n');
//         const mergedContent = ""
//         let zip = new JSZip();
//         zip.folder(fileNamePrefix + ".assets")
//
//         for(let i = 0; i < lines.length; i++) {
//             let line = lines[i]
//
//
//
//
//
//
//
//             // // 检查是否是图片链接，一种形式是![**](https://xxx.com/xxx.png)
//             // // 另外一种形式是<img src="https://xxx.com/xxx.png"/>
//             // if(line.indexOf("![") !== -1) {
//             //     let start = line.indexOf("](")
//             //     let end = line.indexOf(")")
//             //     let url = line.substring(start + 2, end)
//             //     let fileName = url.substring(url.lastIndexOf("/") + 1)
//             //     console.log("fileName: " + fileName)
//             //     console.log("url: " + url)
//             //
//             // } else if(line.indexOf("<img") !== -1) {
//             //     let start = line.indexOf("src=\"")
//             //     let end = line.indexOf("\"", start + 5)
//             //     let url = line.substring(start + 5, end)
//             //     let fileName = url.substring(url.lastIndexOf("/") + 1)
//             //     console.log("fileName: " + fileName)
//             //     console.log("url: " + url)
//             //
//             //
//             // }
//         }
//
//         let url = "https://tenfei03.cfp.cn/creative/vcg/800/new/VCG41N1210205351.jpg"
//         let fileName = url.substring(url.lastIndexOf("/") + 1)
//
//         // 下载图片，然后添加到zip文件中
//         fetch(url, {
//                 method: 'GET',
//                 mode: 'no-cors',
//                 cache: 'default'
//             }
//             ).then(res => res.blob()).then(blob => {
//             zip.file(fileName, blob)
//         })
//
//         // 创建文本文件
//         const fileContent = '这是要写入文件的文本内容。';
//         zip.file(e.file.name, fileContent);
//
//         // 生成 ZIP 压缩文件
//         zip.generateAsync({ type: 'blob' }).then((content) => {
//             // 创建下载链接元素
//             const link = document.createElement('a');
//             link.href = URL.createObjectURL(content);
//             link.download =  fileNamePrefix + '.zip';
//
//             // 将链接添加到页面中并模拟点击
//             document.body.appendChild(link);
//             link.click();
//
//             // 清理 URL 对象
//             URL.revokeObjectURL(link.href);
//         });
//     }
//     reader.readAsText(e.file);
//
//     e.onProgress({ percent: 100 });
//     e.onSuccess();
// }
