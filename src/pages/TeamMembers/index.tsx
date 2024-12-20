import React, { useState, useRef } from "react";
import type { TableColumnsType } from "antd";
import Page from "@/components/Page";
import PageTable from "@/components/Table";
import { Button, Modal, Form, Input, Select, Tag, Space, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import request from "../../utils/request";

type FieldType = {
  name: string;
  team: string;
  label: string;
};

interface DataType {
  key: React.Key;
  name: string;
  team: string;
  label: string;
}

function TeamMembers() {
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const tableRef: any = useRef();
  const [createDlgVisiable, setCreateDlgVisiable] = useState(false);
  const [editDlgVisiable, setEditDlgVisiable] = useState(false);
  const [deleteDlgVisiable, setDeleteDlgVisiable] = useState(false);
  const [selectRow, setSelectRow] = useState({ id: "", name: "" });
  const [messageApi, contextHolder] = message.useMessage();

  const columns: TableColumnsType<DataType> = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      width: 200,
      sorter: true,
    },
    {
      title: "团队",
      dataIndex: "team",
      key: "team",
      render: (text, record, index) => {
        const teamMap = {
          engine: "引擎",
          protocol: "协议",
        };
        return teamMap[text];
      },
      width: 200,
      filters: [
        {
          text: "引擎",
          value: "engine",
        },
        {
          text: "协议",
          value: "protocol",
        },
      ],
    },
    {
      title: "标签",
      dataIndex: "label",
      key: "label",
      render: (text, record, index) => {
        if (text.length === 0) {
          return "--";
        } else {
          const labelMap = {
            frontEnd: { text: "前端", color: "cyan" },
            backEnd: { text: "后端", color: "blue" },
            assemblyLine: { text: "流水线", color: "purple" },
          };
          return text?.map((item) => (
            <Tag color={labelMap[item].color} key={item}>
              {labelMap[item].text}
            </Tag>
          ));
        }
      },
      filters: [
        {
          text: "前端",
          value: "frontEnd",
        },
        {
          text: "后端",
          value: "backEnd",
        },
        {
          text: "流水线",
          value: "assemblyLine",
        },
      ],
      width: 200,
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              onClick={() => {
                toModify(record);
              }}
              type="link"
            >
              编辑
            </Button>
            <Button
              type="link"
              onClick={() => {
                toDelete(record);
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
      width: 200,
    },
  ];

  // 创建
  const toCreate = () => {
    createForm.resetFields();
    setCreateDlgVisiable(true);
  };

  // 确认创建
  const confirmCreate = () => {
    const fromData = createForm.getFieldsValue();
    console.log("[debug] fromData:", fromData);
    createForm
      .validateFields()
      .then((values: FieldType) => {
        setCreateDlgVisiable(false);
        console.log("[debug] values:", values);
        sendCreateReq(values);
        // const newData: DataType = {
        //   key: new Date().getTime().toString(),
        //   ...values,
        // };
        // setCreateDlgVisiable(false);
        // setDataSource([newData, ...dataSource]);
      })
      .catch((errorInfo) => {
        console.log("[debug] errorInfo:", errorInfo);
      });
  };

  // 发送创建请求
  const sendCreateReq = (data) => {
    console.log("[debug] /team-member data:", data);
    return request
      .post("/team-member", data)
      .then((res) => {
        console.log("[debug] /team-member res:", res);
        refreshTable();
        messageApi.open({
          type: "success",
          content: "操作成功",
        });
      })
      .catch((error) => {
        console.log("[debug] /team-member error:", error);
        messageApi.open({
          type: "error",
          content: "操作失败",
        });
      })
      .finally();
  };

  // 取消创建
  const cancelCreate = () => {
    setCreateDlgVisiable(false);
  };

  // 修改
  const toModify = (row) => {
    setSelectRow(row);
    editForm.setFieldsValue(row);
    setEditDlgVisiable(true);
  };

  // 删除
  const toDelete = (row) => {
    setSelectRow(row);
    setDeleteDlgVisiable(true);
  };

  // 确认修改
  const confirmModify = () => {
    editForm.validateFields().then((fromData) => {
      setEditDlgVisiable(false);
      sendEditReq(selectRow.id, fromData);
    });
  };

  // 取消修改
  const cancelEdit = () => {
    setEditDlgVisiable(false);
  };

  // 发送编辑请求
  const sendEditReq = (id, data) => {
    return request
      .patch(`/team-member/${id}`, data)
      .then(() => {
        refreshTable();
        messageApi.open({
          type: "success",
          content: "操作成功",
        });
      })
      .catch(() => {
        messageApi.open({
          type: "error",
          content: "操作失败",
        });
      });
  };

  const dataFormatter = (data) => {
    return data;
  };

  // 确认删除
  const confirmDelete = () => {
    setDeleteDlgVisiable(false);
    if (selectRow?.id) {
      sendDeleteReq(selectRow?.id)
        .then(() => {
          refreshTable();
          messageApi.open({
            type: "success",
            content: "操作成功",
          });
        })
        .catch(() => {
          messageApi.open({
            type: "error",
            content: "操作失败",
          });
        });
    }
  };

  const sendDeleteReq = (id) => {
    return request.delete(`/team-member/${id}`);
  };

  // 取消删除
  const cancelDelete = () => {
    setDeleteDlgVisiable(false);
  };

  const refreshTable = () => {
    if (tableRef && tableRef.current) {
      tableRef.current.refreshData();
    }
  };

  return (
    <Page pageTitle="团队成员">
      <>
        {contextHolder}
        <PageTable
          ref={tableRef}
          url="/team-member"
          columns={columns}
          tableData={[]}
          dataFormatter={dataFormatter}
          headerRightBar={
            <Button type="primary" onClick={toCreate}>
              创建
            </Button>
          }
        />
        {/* 创建弹窗 */}
        <Modal
          maskClosable={false}
          title="创建"
          cancelText="取消"
          okText="确定"
          open={createDlgVisiable}
          onOk={confirmCreate}
          onCancel={cancelCreate}
        >
          <Form
            form={createForm}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="姓名"
              name="name"
              rules={[{ required: true, message: "此项必填" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="团队"
              name="team"
              rules={[{ required: true, message: "此项必填" }]}
            >
              <Select
                options={[
                  { value: "engine", label: "引擎" },
                  { value: "protocol", label: "协议" },
                ]}
              />
            </Form.Item>
            <Form.Item<FieldType> label="标签" name="label">
              <Select
                mode="multiple"
                options={[
                  { value: "frontEnd", label: "前端" },
                  { value: "backEnd", label: "后端" },
                  { value: "assemblyLine", label: "流水线" },
                ]}
              />
            </Form.Item>
          </Form>
        </Modal>
        {/* 编辑弹窗 */}
        <Modal
          maskClosable={false}
          title="编辑"
          cancelText="取消"
          okText="确定"
          open={editDlgVisiable}
          onOk={confirmModify}
          onCancel={cancelEdit}
        >
          <Form
            form={editForm}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="姓名"
              name="name"
              rules={[{ required: true, message: "此项必填" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="团队"
              name="team"
              rules={[{ required: true, message: "此项必填" }]}
            >
              <Select
                options={[
                  { value: "engine", label: "引擎" },
                  { value: "protocol", label: "协议" },
                ]}
              />
            </Form.Item>
            <Form.Item<FieldType> label="标签" name="label">
              <Select
                mode="multiple"
                options={[
                  { value: "frontEnd", label: "前端" },
                  { value: "backEnd", label: "后端" },
                  { value: "assemblyLine", label: "流水线" },
                ]}
              />
            </Form.Item>
          </Form>
        </Modal>
        {/* 删除弹窗 */}
        <Modal
          maskClosable={false}
          title="删除"
          cancelText="取消"
          okText="确定"
          open={deleteDlgVisiable}
          onOk={confirmDelete}
          onCancel={cancelDelete}
        >
          <Space style={{ display: "flex" }}>
            <ExclamationCircleOutlined style={{ color: "red", fontSize: 24 }} />
            <div>确认删除团队成员 {selectRow?.name} 吗？</div>
          </Space>
        </Modal>
      </>
    </Page>
  );
}

export default TeamMembers;
