import "rsuite/dist/rsuite.css";
import "./css/fontello.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./css/customStyles.css";
import "./css/styles.css";
import { useAuth } from "./context/AuthContext";
import UnauthenticatedApp from "./UnauthenticatedApp";
import AuthenticatedApp from "./AuthenticatedApp/AuthenticatedApp";
import { ApplicationsPerformance } from "./screens/ApplicationsPerformance";
import { ToastContainer } from "react-toastify";
import { ItPerformance } from "./screens/ItPerformance";
import { ApplicationsCompliance } from "./screens/ApplicationsCompliance";
import { VisitedSites } from "./screens/VisitedSites";
import { LicenseMonitoring } from "./screens/LicenseMonitoring";
import TimeUtilization from "./screens/TimeUtilization";
import { WebAvailability } from "./screens/WebAvailability";
import {
  ApplicationLicense,
  WebApplications,
  AdminManagement,
  AllowedApplications,
} from "./screens/DataEntry";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

function App() {
  const user = useAuth().user;

  return (
    <div>
      <Router basename="/">
        {user === undefined ? (
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<UnauthenticatedApp />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              element={
                <AuthenticatedApp>
                  <Outlet />
                </AuthenticatedApp>
              }
            >
              <Route path="/landing" element={<ApplicationsPerformance />} />
              <Route path="/Web-Availability" element={<WebAvailability />} />
              <Route
                path="/app-compliance"
                element={<ApplicationsCompliance />}
              />
              <Route path="/it-performance" element={<ItPerformance />} />
              <Route path="/Visited-Sites" element={<VisitedSites />} />
              <Route
                path="/License-Monitoring"
                element={<LicenseMonitoring />}
              />
              <Route path="/time-util" element={<TimeUtilization />} />
              <Route
                path="/Application-License"
                element={<ApplicationLicense />}
              />
              <Route
                path="/Allowed-Applications"
                element={<AllowedApplications />}
              />
              {user?.role === "SuperAdmin" ? (
                <Route path="/admin-management" element={<AdminManagement />} />
              ) : (
                <Route path="/landing" element={<ApplicationsPerformance />} />
              )}
              <Route path="/Web-Applications" element={<WebApplications />} />
              <Route path="*" element={<Navigate to="/landing" />} />
            </Route>
          </Routes>
        )}
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
