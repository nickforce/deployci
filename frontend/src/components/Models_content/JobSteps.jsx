import { Steps, Divider } from 'antd';

const { Step } = Steps;
const JobSteps = (props) => {
return (
    <>
    <Steps progressDot current={0}>
      <Step title="Source" description="github" />
      <Step title="Target" description="salesforce" />
      <Step title="Deploy" description="Ready to deploy" />
    </Steps>
    {/* <Divider />
    <Steps progressDot current={1} direction="vertical">
      <Step title="Finished" description="This is a description. This is a description." />
      <Step title="Finished" description="This is a description. This is a description." />
      <Step title="In Progress" description="This is a description. This is a description." />
      <Step title="Waiting" description="This is a description." />
      <Step title="Waiting" description="This is a description." />
    </Steps> */}
  </>
);
};


export default JobSteps;