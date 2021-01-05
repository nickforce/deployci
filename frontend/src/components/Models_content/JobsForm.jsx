import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 24 },
};

const JobsForm = () => {
  return (
    <Form {...layout} name="control-hooks">
      <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Type" label="Type" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Relation" label="Relation" rules={[{ required: true }]}>
        <Select placeholder="Select a option ">
          <Option value="relation 1">Relation 1</Option>
          <Option value="relation 2">Relation 2</Option>
          <Option value="relation 3">Relation 3</Option>
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
export default JobsForm;
