import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 24 },
};
const selectBefore = (
  <Select defaultValue="http://" className="select-before">
    <Option value="http://">http://</Option>
    <Option value="https://">https://</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue=".com" className="select-after">
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);
const EnvoirmentForm = () => {
  return (
    <Form {...layout} name="control-hooks">
      <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="please enter Name" />
      </Form.Item>
      <Form.Item name="Type" label="Type" rules={[{ required: true }]}>
        <Input placeholder="please enter GitHub repo" />
      </Form.Item>
      <Form.Item name="Url" label="Url" rules={[{ required: true }]}>
        <Input
          id="url"
          addonBefore={selectBefore}
          addonAfter={selectAfter}
          defaultValue="mysite"
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default EnvoirmentForm;
