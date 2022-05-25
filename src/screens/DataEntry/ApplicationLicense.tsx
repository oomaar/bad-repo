import { useEffect, useState } from "react";
import { useAuthedClient } from "../../context/AuthedClientContext";
import { AppLicense } from "../../client/AuthedClient";
import { Loader } from "../../components/Loader/Loader";
import {
  ApplicationLicenseTable,
  ApplicationLicenseModal,
} from "../../components/ApplicationLicense";
import { ToastFunction } from "../../utils/ToastFunction";
import { DeleteModal } from "../../components/DataEntry";

type State =
  | {
      kind: "loading";
    }
  | {
      kind: "loaded";
      processes: Array<AppLicense>;
    }
  | { kind: "errored" };

export const ApplicationLicense = () => {
  const authedClient = useAuthedClient();

  useEffect(() => {
    callGetAppLicense();
    getAppsWithoutLicense();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState<State>({ kind: "loading" });
  const [currentApp, setCurrentApp] = useState<undefined | number>(undefined);
  const [currentAppName, setCurrentAppName] = useState<string>("");
  const [editing, setEditing] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [appName, setAppName] = useState<string | null>("All Applications");
  const [currentAppVersion, setCurrentAppVersion] = useState(0);
  const [appsWithoutLicese, setAppsWithoutLicese] = useState<
    Array<{ appname: string; id: number }>
  >([]);

  function handleResponseReceived(response: Array<AppLicense>) {
    setState({ kind: "loaded", processes: response });
  }

  function handleErrored() {
    setState({ kind: "errored" });
  }

  function getAppsWithoutLicense() {
    authedClient.getAllowedAppsWithNoLicense().then((res) => {
      let elemnt: Array<{ appname: string; id: number }> = [];
      // eslint-disable-next-line array-callback-return
      res.map((el) => {
        elemnt.push({ appname: el.applicationName, id: el.recordId });
      });
      setAppsWithoutLicese(elemnt);
    });
  }

  function callGetAppLicense() {
    authedClient
      .getApplicationLicense()
      .then((res) => {
        handleResponseReceived(res);
      })
      .catch(() => handleErrored());
  }

  function callDeleteApplicationLicense(id: number | undefined) {
    authedClient.deleteApplicationLicense(id).then((res) => {
      callGetAppLicense();
      getAppsWithoutLicense();
      setShowDeleteModal(false);
    });
  }

  function callAddEditApplicationLicense(
    id: number | undefined,
    editing: boolean,
    appName: string | null,
    noLicenses: number
  ) {
    authedClient
      .addEditApplicationLicense(id, editing, appName, noLicenses)
      .then((res) => {
        callGetAppLicense();
        getAppsWithoutLicense();
      });
  }

  const handleAddNew = () => {
    setEditing(false);
    setCurrentAppVersion(0);
    setLgShow(true);
  };

  const handleEdit = (
    noLicenses: number,
    applicationName: string,
    recordId: number
  ) => {
    setEditing(true);
    setCurrentAppVersion(noLicenses);
    getCurrentApp(recordId, applicationName);
    setLgShow(true);
  };

  const handleDelete = (recordId: number, applicationName: string) => {
    getCurrentApp(recordId, applicationName);
    setShowDeleteModal(true);
  };

  const handleSubmit = () => {
    function getid(appname: string | null) {
      const obj = appsWithoutLicese.filter((el) => {
        return el.appname === appname;
      });
      return obj[0].id;
    }

    if (editing) {
      if (isValidCurrentAppVersion) {
        callAddEditApplicationLicense(
          currentApp,
          editing,
          currentAppName,
          currentAppVersion
        );
        handleCloseModal();
      } else {
        // Replaced With Form Error Validation
        // ToastFunction("Invalid Data Entry");
      }
    } else if (!editing) {
      if (
        appName !== "All Applications" &&
        appName !== null &&
        currentAppVersion !== 0 &&
        currentAppVersion > 0
      ) {
        callAddEditApplicationLicense(
          getid(appName),
          editing,
          appName,
          currentAppVersion
        );
        setAppName("All Applications ");
        handleCloseModal();
      } else {
        ToastFunction("Invalid Data Entry");
      }
    } else {
      ToastFunction("Invalid Data Entry");
    }
  };

  function getCurrentApp(id: number, name: string) {
    setCurrentApp(id);
    setCurrentAppName(name);
  }

  const handleCloseModal = () => setLgShow(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const isValidCurrentAppVersion = currentAppVersion > 0;
  const handleModalTitle = editing ? currentAppName : "Add New";
  const handleDisabledApplicationName = editing ? currentAppName : appName;
  const handleInputValue = isValidCurrentAppVersion ? currentAppVersion : "";

  const deleteButton = (
    <button
      onClick={() => callDeleteApplicationLicense(currentApp)}
      className="btn btn-primary btn-sm"
      type="submit"
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
          <h1 className="me-auto">Application License</h1>
        </div>
        <ApplicationLicenseTable
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          processes={state.processes}
          handleAddNew={handleAddNew}
        />
        <ApplicationLicenseModal
          handleCloseModal={handleCloseModal}
          lgShow={lgShow}
          handleModalTitle={handleModalTitle}
          editing={editing}
          handleDisabledApplicationName={handleDisabledApplicationName}
          appName={appName}
          appsWithoutLicese={appsWithoutLicese}
          handleInputValue={handleInputValue}
          handleSubmit={handleSubmit}
          setAppName={setAppName}
          setCurrentAppVersion={setCurrentAppVersion}
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
