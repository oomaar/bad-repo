import { Page, PageProps } from "./Page";
import { ReactElement } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Loader } from "./Loader/Loader";

const INITIAL_TAB_INDEX = 0;

export function TabbedPage<T>(props: {
  pageProps: Omit<PageProps<T>, "body">;
  tabs: Array<{
    title: string;
    body: (data: T, onDataChange: () => void) => ReactElement;
  }>;
}) {
  const { pageProps, tabs } = props;

  return (
    <Page
      title={pageProps.title}
      fetchData={pageProps.fetchData}
      shouldShowNoData={pageProps.shouldShowNoData}
      body={(data, onDataChange) => (
        <div className="customTab">
          <Tabs
            defaultActiveKey={INITIAL_TAB_INDEX}
            id="uncontrolled-tab-example"
          >
            {tabs.map((tab, index) => (
              <Tab key={index} eventKey={index} title={tab.title}>
                {tab.body(data, onDataChange)}
              </Tab>
            ))}
          </Tabs>
        </div>
      )}
      loading={
        <div className="customTab">
          <Tabs
            defaultActiveKey={INITIAL_TAB_INDEX}
            id="uncontrolled-tab-example"
          >
            {tabs.map((tab, index) => (
              <Tab key={index} eventKey={index} title={tab.title}>
                <Loader />
              </Tab>
            ))}
          </Tabs>
        </div>
      }
    />
  );
}
