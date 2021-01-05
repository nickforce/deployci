import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 24 },
};

const EmployeesForm = () => {
  return (
    <Form {...layout} name="control-hooks">
      <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Type" label="Type" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="Environment"
        label="Environment"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select a option ">
          <Option value="env 1">env 1</Option>
          <Option value="env 2">env 2</Option>
          <Option value="env 3">env 3</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="Environment"
        label="Environment"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select a option ">
          <Option value="env 1">env 1</Option>
          <Option value="env 2">env 2</Option>
          <Option value="env 3">env 3</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default EmployeesForm;
