import { ReactElement } from "react";
import { Tab, Tabs } from "react-bootstrap";

const INITIAL_TAB_INDEX = 0;

export function TabbedContainer(props: {
  tabs: Array<{ title: string; body: ReactElement }>;
}) {
  const { tabs } = props;

  return (
    <div className="customTab">
      <Tabs defaultActiveKey={INITIAL_TAB_INDEX} id="uncontrolled-tab-example">
        {tabs.map((tab, index) => (
          <Tab key={index} eventKey={index} title={tab.title}>
            {tab.body}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
