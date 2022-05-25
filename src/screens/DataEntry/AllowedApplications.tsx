import { useEffect, useState } from "react";
import { useAuthedClient } from "../../context/AuthedClientContext";
import { AllowedApps } from "../../client/AuthedClient";
import { Loader } from "../../components/Loader/Loader";
import { ToastFunction } from "../../utils/ToastFunction";
import {
  AllowedApplicationsTable,
  AllowedApplicationsModal,
} from "../../components/AllowedApplications";
import { DeleteModal } from "../../components/DataEntry";

type State =
  | {
      kind: "loading";
    }
  | {
      kind: "loaded";
      processes: Array<AllowedApps>;
    }
  | { kind: "errored" };

export const AllowedApplications = () => {
  const authedClient = useAuthedClient();

  useEffect(() => {
    callGetAllowedApps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState<State>({ kind: "loading" });
  const [currentApp, setCurrentApp] = useState<undefined | number>(undefined);
  const [currentVersion, setCurrentVersion] = useState("");
  const [currentAppName, setCurrentAppName] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newAppName, setNewAppName] = useState<string>("");
  const [, setAppVersion] = useState("");

  const validateForm = newAppName !== "" && currentVersion !== "";

  function handleResponseReceived(response: Array<AllowedApps>) {
    setState({ kind: "loaded", processes: response });
  }

  function handleErrored() {
    setState({ kind: "errored" });
  }

  function callGetAllowedApps() {
    authedClient
      .getAllowedApps()
      .then((res) => {
        handleResponseReceived(res);
      })
      .catch(() => handleErrored());
  }

  function callAddEditAllowedApps(
    id: number | undefined,
    editing: boolean,
    appName: string,
    appVersion: string
  ) {
    authedClient
      .addEditAllowedApplications(id, editing, appName, appVersion)
      .then((res) => {
        handleCloseAddModal();
        if (res) {
          callGetAllowedApps();
        }
      });
  }

  function callDeleteAllowedApps(id: number) {
    authedClient.deleteAllowedApplications(id).then((res) => {
      if (res) {
        handleCloseDeleteModal();
        callGetAllowedApps();
      } else {
        handleCloseDeleteModal();
        ToastFunction(
          "Can't delete this application because it has a license. Please delete it from 'Application License' first"
        );
      }
    });
  }

  const handleModalTitle = editing ? currentAppName : "Add New";
  const handleEditInputValue = editing ? currentAppName : newAppName;
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleCloseAddModal = () => setShowModal(false);
  const handleSubmit = () => {
    if (editing) {
      if (currentVersion !== "") {
        callAddEditAllowedApps(
          currentApp,
          editing,
          currentAppName,
          currentVersion
        );
        setAppVersion("");
      } else {
        ToastFunction("you must enter an application name and a version");
      }
    } else if (!editing) {
      if (newAppName !== "" && currentVersion !== "") {
        callAddEditAllowedApps(currentApp, editing, newAppName, currentVersion);
        setAppVersion("");
        setNewAppName("");
      } else {
        ToastFunction("you must enter an application name and a version");
      }
    } else {
      ToastFunction("you must enter an application name and a version");
    }
  };

  const handleAddNew = () => {
    setEditing(false);
    setCurrentVersion("");
    setShowModal(true);
  };
  const handleDelete = (recordId: number, applicationName: string) => {
    getCurrentApp(recordId, applicationName);
    setShowDeleteModal(true);
  };
  const handleEdit = (
    recordId: number,
    applicationName: string,
    applicationVersion: string
  ) => {
    getCurrentApp(recordId, applicationName);
    setEditing(true);
    applicationVersion === null
      ? setCurrentVersion("")
      : setCurrentVersion(applicationVersion);
    setShowModal(true);
  };

  function getCurrentApp(id: number, name: string) {
    setCurrentApp(id);
    setCurrentAppName(name);
  }

  const deleteButton = (
    <button
      onClick={() => callDeleteAllowedApps(currentApp!)}
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
          <h1 className="me-auto">Allowed Applications</h1>
        </div>
        <AllowedApplicationsTable
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          processes={state.processes}
          handleAddNew={handleAddNew}
        />
        <AllowedApplicationsModal
          showModal={showModal}
          handleCloseAddModal={handleCloseAddModal}
          handleModalTitle={handleModalTitle}
          newAppName={newAppName}
          setNewAppName={setNewAppName}
          editing={editing}
          handleEditInputValue={handleEditInputValue}
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
