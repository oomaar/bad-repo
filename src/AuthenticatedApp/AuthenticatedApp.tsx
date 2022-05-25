import { Layout } from "../layout/Layout";

function AuthenticatedApp(props: any) {
  return <Layout>{props.children}</Layout>;
}

export default AuthenticatedApp;
