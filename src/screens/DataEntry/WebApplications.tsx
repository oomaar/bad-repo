import { useEffect, useState } from "react";
import { useAuthedClient } from "../../context/AuthedClientContext";
import { webApps } from "../../client/AuthedClient";
import { Loader } from "../../components/Loader/Loader";
import {
  WebApplicationTable,
  WebapplicationModal,
} from "../../components/WebApplication";
import { DeleteModal } from "../../components/DataEntry";

type State =
  | {
      kind: "loading";
    }
  | {
      kind: "loaded";
      processes: Array<webApps>;
    }
  | { kind: "errored" };
export const WebApplications = () => {
  const authedClient = useAuthedClient();

  useEffect(() => {
    callGetWebApps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState<State>({ kind: "loading" });
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentApp, setCurrentApp] = useState<undefined | number>(undefined);
  const [currentAppName, setCurrentAppName] = useState<string>("");
  const [editing, setEditing] = useState(false);
  const [currentVersion, setCurrentVersion] = useState("");
  const [appName, setAppName] = useState("");
  const [, setAppVersion] = useState("");

  const validateForm = appName !== "" && currentVersion !== "";

  function handleResponseReceived(response: Array<webApps>) {
    setState({ kind: "loaded", processes: response });
  }

  function handleErrored() {
    setState({ kind: "errored" });
  }

  function callGetWebApps() {
    authedClient
      .getAllWebApps()
      .then((res) => {
        handleResponseReceived(res);
      })
      .catch(() => handleErrored());
  }

  function callDeleteWebApp(id: number | undefined) {
    authedClient.DeleteWebApp(id).then((res) => {
      if (res) {
        handleCloseDeleteModal();
        callGetWebApps();
      } else {
        handleCloseDeleteModal();
      }
    });
  }

  function callAddEditWebApps(
    id: number | undefined,
    editing: boolean,
    appName: string | null,
    url: string
  ) {
    authedClient.addEditWebApps(id, editing, appName, url).then((res) => {
      callGetWebApps();
      setShowModal(false);
    });
  }

  const handleEdit = (id: number, applicationName: string, url: string) => {
    getCurrentApp(id, applicationName);
    setEditing(true);
    setShowModal(true);
    setCurrentVersion(url);
  };

  const handleDelete = (id: number, applicationName: string) => {
    getCurrentApp(id, applicationName);
    setShowDeleteModal(true);
  };

  const handleAddNew = () => {
    setEditing(false);
    setCurrentVersion("");
    setShowModal(true);
    getCurrentApp(0, "");
  };

  const handleSubmit = () => {
    if (editing) {
      if (currentVersion !== "") {
        callAddEditWebApps(currentApp, editing, currentAppName, currentVersion);
        setAppVersion("");
      }
    } else if (!editing) {
      if (appName !== "" && currentVersion !== "") {
        callAddEditWebApps(currentApp, editing, appName, currentVersion);
        setAppVersion("");
        setAppName("");
      }
    } else {
      alert("you must enter an app name and a version");
    }
  };

  function getCurrentApp(id: number, name: string) {
    setCurrentApp(id);
    setCurrentAppName(name);
  }

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleCloseAddModal = () => setShowModal(false);
  const handleModalTitle = editing ? currentAppName : "Add New";
  const handleInputValue = editing ? currentAppName : appName;

  const deleteButton = (
    <button
      onClick={() => callDeleteWebApp(currentApp)}
      className="btn btn-primary btn-sm"
    >
      Confirm
    </button>
  );

  if (state.kind === "loading") {
    return <Loader />;
  } else if (state.kind === "loaded") {
    return (
      <div className="page-container">
        <div className="page-title d-xl-flex">
          <h1 className="me-auto">Web Applications</h1>
        </div>

        <WebApplicationTable
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          processes={state.processes}
          handleAddNew={handleAddNew}
        />
        <WebapplicationModal
          showModal={showModal}
          handleCloseAddModal={handleCloseAddModal}
          handleModalTitle={handleModalTitle}
          appName={appName}
          setAppName={setAppName}
          editing={editing}
          handleInputValue={handleInputValue}
          setCurrentVersion={setCurrentVersion}
          currentVersion={currentVersion}
          handleSubmit={handleSubmit}
          validateForm={validateForm}
        />
        <DeleteModal
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          currentAppName={currentAppName}
          deleteButton={deleteButton}
        />
      </div>
    );
  } else {
    return <div>Something wrong happened. Please, contact the developers.</div>;
  }
};
