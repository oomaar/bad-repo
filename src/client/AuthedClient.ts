import axios, { AxiosResponse } from "axios";
import { DateTime } from "luxon";
import {
  AllowedApplicationApi,
  ApplicationLicenseApi,
  ApplicationsComplianceApi,
  AuthenticateApi,
  ComputerApi,
  GraphsApi,
  GroupApi,
  ProcessesPerformanceApi,
  UserApi,
  WebAppMonitoringApi,
} from "../generated/v1/swagger";
import { ToastFunction } from "../utils/ToastFunction";
import { basePath } from "./basePath";

// License Monitoring
export type GetLicenseMonitoringResponse = Array<
  GetLicenseMonitoringResponseProcess
>;

export type GetLicenseMonitoringResponseProcess = {
  applicationId: number;
  applicationName: string;
  numberOfLicenses: number;
  numberOfDevices: number;
};

export type GetLicenseMonitoringDetails = Array<
  GetLicenseMonitoringResponseDetailsProcess
>;

export type GetLicenseMonitoringResponseDetailsProcess = {
  applicationName: string;
  computerId: number;
  computerName: string;
};

// Visited Sites
export type GetVisitedSitesResponse = Array<GetVisitedSitesResponseProcess>;

export type GetVisitedSitesResponseProcess = {
  applicationName: string;
  percentage: number;
  tabName: string;
};

export type GetProcessesVisitedSitesDetails = Array<
  GetProcessesVisitedSitesDetailsProcess
>;

export type GetProcessesVisitedSitesDetailsProcess = {
  computerName: string;
  applicationName: string;
  mainWindowTitle: string;
  groupId: number;
  time: string;
  count: number;
};

// It Performance
export type GetItPerformanceResponse = Array<
  GetProcessesItPerformanceResponseProcess
>;

export type GetProcessesItPerformanceResponseProcess = {
  processName: string;
  computersCount: number;
  maxCPU: number;
  minCPU: number;
  averageCPU: number;
  averageDiskInMb: number;
  minDiskInMb: number;
  maxDiskInMb: number;
  averageMemoryPercentage: number;
  averageMemoryInMb: number;
  minMemoryInMb: number;
  maxMemoryInMb: number;
};

//It Performance LineChart
export type GetLineChartData = Array<GetLineChartDataProcess>;
export type GetLineChartDataProcess = {
  timeLabel: "string";
  data: Array<{
    xAxisValue: "string";
    averageCPU: number;
    averageMemoryInMb: number;
    averageMemoryPercentage: number;
    averageDiskInMb: number;
    computersCount: number;
  }>;
};
// Applications Performance
export type GetProcessesPerformanceResponse = Array<
  GetProcessesPerformanceResponseProcess
>;

export type GetProcessesPerformanceResponseProcess = {
  processName: string;
  totalCount: number;
  successCount: number;
  failureCount: number;
  computersCount: number;
  failureComputersCount: number;
  failPercentage: number;
};

export type GetProcessesPerformanceDetails = Array<
  GetProcessesPerformanceDetailsProcess
>;

export type GetProcessesPerformanceDetailsProcess = {
  recordId: number;
  computerId: number;
  computerName: string;
  processId: string;
  userName: string;
  userId: string;
  groupId: null;
  sampleTime: string;
  processName: string;
  isProcessResponding: boolean;
};

export type GetModalDevicesTabDetails = Array<GetModalDevicesTabDetailsProcess>;

export type GetModalDevicesTabDetailsProcess = {
  computerId: number;
  computerName: string;
};

// Groups and Users
export type GetGroups = Array<Group>;

export type Group = {
  recordId: number;
  groupName: string;
  creationDate: string;
  isDeleted: boolean;
};

export type getUsers = Array<user>;

export type user = {
  computerId: number;
  computerName: string;
  machineDomain: string;
  machineModel: string;
  computerSerial: string;
  computerOsName: string;
  computerOsManufacture: string;
  computerOsVersion: string;
  computerOsArchitecture: string;
  groupId: 2;
};

// Allowed Applications
export type GetAllowedApplications = Array<AllowedApps>;

export type AllowedApps = {
  recordId: number;
  applicationName: string;
  applicationVersion: string;
  creationDate: string;
};

// Application License
export type AppLicense = {
  recordId: number;
  applicationId: number;
  applicationName: string;
  noLicenses: number;
  licenseStartDate: null;
  licenseEndDate: null;
  creationDate: string;
  isDeleted: boolean;
};

// Applications Compliance
export type GetProcessesNotCompliedApplicationsInstancesDetails = Array<
  GetNotCompliedApplicationsInstancesProcess
>;

export type GetNotCompliedApplicationsInstancesProcess = {
  applicationName: string;
  computerName: string;
  devicesCount: number;
  time: string;
};

export type GetApplicationsAndDevicesComplianceResponse = {
  totalApplicationsCount: number;
  allowedApplicationsCount: number;
  notAllowedApplicationsCount: number;
  compliedDevicesCount: number;
  notCompliedDevicesCount: number;
  totalDevicesCount: number;
  applicationsDetails: Array<GetApplicationsAndDevicesComplianceDetail>;
  devicesList: Array<GetApplicationsAndDevicesComplianceResponseDevice>;
};

export type GetApplicationsAndDevicesComplianceResponseDevice = {
  computerId: number;
  computerName: string;
  computerOsArchitecture: string;
  computerOsManufacture: string;
  computerOsName: string;
  computerOsVersion: string;
  computerSerial: string;
  groupId: number;
  machineDomain: string;
  machineModel: string;
};

export type GetApplicationsAndDevicesComplianceDetail = {
  applicationName: string;
  devicesCount: number;
  compliedDevicesCount: number;
  applicationsDetails: Array<GetApplicationsAndDevicesComplianceDetail>;
};

// Web Availability
export type GetWebAvailablity = Array<GetWebAvailablityProcess>;

export type GetWebAvailablityProcess = {
  data: Array<GetWebAvailablityData>;
  status: string;
  statusCode: number;
  message: string;
};

export type GetWebAvailablityData = {
  webAppID: number;
  applicationName: string;
  url: string;
  totalCount: number;
  successCount: number;
  failureCount: number;
  averageResponseTime: number;
  percentage: number;
};

// Time Utilization
export type TimeUtil = {
  computerName: string;
  applicationName: string;
  applicationUtilizationStart: string;
  applicationUtilizationEnd: string;
};

// Web Applications
export type webApps = {
  id: number;
  applicationName: string;
  url: string;
  description: string;
};

// User Management
export type GetUsersAdmins = {
  status: string;
  statusCode: number;
  message: string;
  data: Array<GetUsersAdminsData>;
};

export type GetUsersAdminsData = {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  title: string;
};

//profilepassChange
export type PassChangeResult = {
  data: boolean;
  status: string;
  statusCode: number;
  message: null;
};

class AuthedClient {
  private readonly groupApi: GroupApi;
  private readonly computerApi: ComputerApi;
  private readonly processesPerformanceApi: ProcessesPerformanceApi;
  private readonly graphsApi: GraphsApi;
  private readonly applicationLicenseApi: ApplicationLicenseApi;
  private readonly applicationsComplianceApi: ApplicationsComplianceApi;
  private readonly webAppMonitoringApi: WebAppMonitoringApi;
  private readonly allowedApplicationApi: AllowedApplicationApi;
  private readonly userApi: UserApi;
  private readonly authenticateApi: AuthenticateApi;

  constructor(token: string) {
    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use(
      (config) => {
        if (config.headers === undefined) {
          config.headers = {};
        }

        if (config.headers.Authorization === undefined) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          ToastFunction("Please re-authenticate.");
        }

        return Promise.reject(error);
      }
    );

    this.groupApi = new GroupApi(undefined, basePath, axiosInstance);
    this.computerApi = new ComputerApi(undefined, basePath, axiosInstance);
    this.processesPerformanceApi = new ProcessesPerformanceApi(
      undefined,
      basePath,
      axiosInstance
    );
    this.graphsApi = new GraphsApi(undefined, basePath, axiosInstance);
    this.applicationLicenseApi = new ApplicationLicenseApi(
      undefined,
      basePath,
      axiosInstance
    );
    this.applicationsComplianceApi = new ApplicationsComplianceApi(
      undefined,
      basePath,
      axiosInstance
    );
    this.webAppMonitoringApi = new WebAppMonitoringApi(
      undefined,
      basePath,
      axiosInstance
    );
    this.allowedApplicationApi = new AllowedApplicationApi(
      undefined,
      basePath,
      axiosInstance
    );
    this.userApi = new UserApi(undefined, basePath, axiosInstance);
    this.authenticateApi = new AuthenticateApi(
      undefined,
      basePath,
      axiosInstance
    );
  }

  private static dateTimeInQueryParam(date: DateTime) {
    return date.toISODate();
  }

  private static dateInQueryParam(date: Date) {
    return AuthedClient.dateTimeInQueryParam(DateTime.fromJSDate(date));
  }

  private static groupInQueryParam(group: number) {
    return group === 0 ? undefined : group;
  }

  // Users & Groups
  async getGroups(): Promise<GetGroups> {
    const response = await this.groupApi.apiGroupGetAllGroupsGet();

    return (response.data as unknown) as GetGroups;
  }

  async getUsers(): Promise<getUsers> {
    const response = await this.computerApi.apiComputerGetAllComputersGet();

    return (response.data as unknown) as getUsers;
  }

  // Applications Performance
  async getProcessesPerformance(
    fromDate: DateTime,
    toDate: DateTime,
    currentgroup: number,
    currentUser: number | undefined
  ): Promise<GetProcessesPerformanceResponse> {
    const response = await this.processesPerformanceApi.apiProcessesPerformanceGetProcessesPerformanceGet(
      AuthedClient.dateTimeInQueryParam(fromDate),
      AuthedClient.dateTimeInQueryParam(toDate),
      AuthedClient.groupInQueryParam(currentgroup),
      currentUser
    );

    return (response.data as unknown) as GetProcessesPerformanceResponse;
  }

  async getFailureDetails(
    ProcessName: string,
    fromDate: DateTime,
    toDate: DateTime,
    currentgroup: number,
    currentUser: number | undefined
  ): Promise<GetProcessesPerformanceDetails> {
    const response = await this.processesPerformanceApi.apiProcessesPerformanceGetProcessFailureRecordsGet(
      ProcessName,
      AuthedClient.dateTimeInQueryParam(fromDate),
      AuthedClient.dateTimeInQueryParam(toDate),
      AuthedClient.groupInQueryParam(currentgroup),
      currentUser
    );

    return (response.data as unknown) as GetProcessesPerformanceDetails;
  }

  async getDevicesDetails(
    ProcessName: string,
    fromDate: DateTime,
    toDate: DateTime,
    currentgroup: number,
    currentUser: number | undefined
  ): Promise<GetModalDevicesTabDetails> {
    const response = await this.processesPerformanceApi.apiProcessesPerformanceGetProcessDevicesListGet(
      ProcessName,
      AuthedClient.dateTimeInQueryParam(fromDate),
      AuthedClient.dateTimeInQueryParam(toDate),
      AuthedClient.groupInQueryParam(currentgroup),
      currentUser
    );

    return (response.data as unknown) as GetModalDevicesTabDetails;
  }

  // It Performance
  async getProcessesItPerformance(
    fromDate: DateTime,
    toDate: DateTime,
    currentgroup: number,
    currentUser: number | undefined
  ): Promise<GetItPerformanceResponse> {
    const response = await this.processesPerformanceApi.apiProcessesPerformanceGetProcessesCPUMemoryDiskPerformanceGet(
      AuthedClient.dateTimeInQueryParam(fromDate),
      AuthedClient.dateTimeInQueryParam(toDate),
      AuthedClient.groupInQueryParam(currentgroup),
      currentUser
    );

    return (response.data as unknown) as GetItPerformanceResponse;
  }
  // line chart
  async getLineChartData(
    fromDate: DateTime,
    toDate: DateTime,
    currentgroup: number,
    currentUser: number | undefined
  ): Promise<GetLineChartData> {
    const user = localStorage.getItem("user");
    const userobj = user !== null && JSON.parse(user);
    let response = undefined;
    if (currentgroup === 0 && currentUser === undefined) {
      response = await axios.get(
        `https://flyworex.azurewebsites.net/api/ItTrend/GetItTrend?from=${fromDate.toISODate()}&to=${toDate.toISODate()}`,
        { headers: { Authorization: `Bearer ${userobj.token}` } }
      );
    } else if (currentUser === undefined && currentgroup !== 0) {
      response = await axios.get(
        `https://flyworex.azurewebsites.net/api/ItTrend/GetItTrend?from=${fromDate.toISODate()}&to=${toDate.toISODate()}&groupId=${currentgroup}`,
        { headers: { Authorization: `Bearer ${userobj.token}` } }
      );
    } else if (currentUser !== undefined && currentgroup === 0) {
      response = await axios.get(
        `https://flyworex.azurewebsites.net/api/ItTrend/GetItTrend?from=${fromDate.toISODate()}&to=${toDate.toISODate()}&computerId=${currentUser}`,
        { headers: { Authorization: `Bearer ${userobj.token}` } }
      );
    } else {
      response = await axios.get(
        `https://flyworex.azurewebsites.net/api/ItTrend/GetItTrend?from=${fromDate.toISODate()}&to=${toDate.toISODate()}&groupId=${currentgroup}&computerId=${currentUser}`,
        { headers: { Authorization: `Bearer ${userobj.token}` } }
      );
    }

    return response.data;
  }
  // Visited Sites
  async getVisitedSites(
    fromDate: DateTime,
    toDate: DateTime,
    currentgroup: number,
    currentUser: number | undefined
  ): Promise<GetVisitedSitesResponse> {
    const response = await this.graphsApi.apiGraphsGetApdTabsUsagePercentageGet(
      AuthedClient.dateTimeInQueryParam(fromDate),
      AuthedClient.dateTimeInQueryParam(toDate),
      AuthedClient.groupInQueryParam(currentgroup),
      currentUser
    );

    return (response.data as unknown) as GetVisitedSitesResponse;
  }

  async getVisitedSitesDetails(
    siteName: string,
    fromDate: DateTime,
    toDate: DateTime,
    currentgroup: number,
    currentUser: number | undefined
  ): Promise<GetProcessesVisitedSitesDetails> {
    const response = await this.graphsApi.apiGraphsGetVisitedSiteDetailsGet(
      siteName,
      AuthedClient.dateTimeInQueryParam(fromDate),
      AuthedClient.dateTimeInQueryParam(toDate),
      AuthedClient.groupInQueryParam(currentgroup),
      currentUser
    );

    return (response.data as unknown) as GetProcessesVisitedSitesDetails;
  }

  // License Monitoring
  async getLicenseMonitoring(
    fromDate: DateTime,
    toDate: DateTime,
    currentgroup: number,
    currentUser: number | undefined
  ): Promise<GetLicenseMonitoringResponse> {
    // The backend currently doesn't take a user filter. However, we were instructed to leave keep sending the user
    // filter for now.
    const options =
      currentUser === undefined
        ? undefined
        : { params: { computerId: currentUser } };

    const response = await this.applicationLicenseApi.apiApplicationLicenseGetApplicationsLicensesUtilizationGet(
      AuthedClient.dateTimeInQueryParam(fromDate),
      AuthedClient.dateTimeInQueryParam(toDate),
      AuthedClient.groupInQueryParam(currentgroup),
      options
    );

    return (response.data as unknown) as GetLicenseMonitoringResponse;
  }

  async getLicenseMonitoringDetails(
    applicationName: string,
    fromDate: DateTime,
    toDate: DateTime,
    currentgroup: number,
    currentUser: number | undefined
  ): Promise<GetLicenseMonitoringDetails> {
    // The backend currently doesn't take a user filter. However, we were instructed to leave keep sending the user
    // filter for now.
    const options =
      currentUser === undefined
        ? undefined
        : { params: { computerId: currentUser } };

    const response = await this.applicationLicenseApi.apiApplicationLicenseGetApplicationLicenseDevicesApplicationNameGet(
      applicationName,
      AuthedClient.dateTimeInQueryParam(fromDate),
      AuthedClient.dateTimeInQueryParam(toDate),
      AuthedClient.groupInQueryParam(currentgroup),
      options
    );

    return (response.data as unknown) as GetLicenseMonitoringDetails;
  }

  // Apllications Compliance
  async getNotCompliedApplicationsInstances(
    applicationName: string,
    fromDate: DateTime,
    toDate: DateTime,
    currentgroup: number,
    currentUser: number | undefined
  ): Promise<GetProcessesNotCompliedApplicationsInstancesDetails> {
    const response = await this.applicationsComplianceApi.apiApplicationsComplianceGetNotCompliedApplicationsInstancesGet(
      applicationName,
      AuthedClient.dateTimeInQueryParam(fromDate),
      AuthedClient.dateTimeInQueryParam(toDate),
      AuthedClient.groupInQueryParam(currentgroup),
      currentUser
    );

    return (response.data as unknown) as GetProcessesNotCompliedApplicationsInstancesDetails;
  }

  async getApplicationsAndDevicesCompliance(
    fromDate: DateTime,
    toDate: DateTime,
    currentgroup: number,
    currentUser: number | undefined
  ): Promise<GetApplicationsAndDevicesComplianceResponse> {
    const response = await this.applicationsComplianceApi.apiApplicationsComplianceGetApplicationsAndDevicesComplianceGet(
      AuthedClient.dateTimeInQueryParam(fromDate),
      AuthedClient.dateTimeInQueryParam(toDate),
      AuthedClient.groupInQueryParam(currentgroup),
      currentUser
    );

    return (response.data as unknown) as GetApplicationsAndDevicesComplianceResponse;
  }

  // Web Availability
  async getWebAvailabilityData(
    fromDate: DateTime,
    toDate: DateTime,
    currentgroup: number,
    currentUser: number | undefined
  ): Promise<GetWebAvailablityProcess> {
    const response = await this.webAppMonitoringApi.apiWebAppMonitoringGetWebAppsAvailabilityGet(
      AuthedClient.dateTimeInQueryParam(fromDate),
      AuthedClient.dateTimeInQueryParam(toDate),
      AuthedClient.groupInQueryParam(currentgroup),
      currentUser
    );

    return (response.data as unknown) as GetWebAvailablityProcess;
  }

  // Allowed Applications
  async getAllowedApps(): Promise<Array<AllowedApps>> {
    const response = await this.allowedApplicationApi.apiAllowedApplicationGetAllowedApplicationsGet();

    return (response.data as unknown) as Array<AllowedApps>;
  }

  async deleteAllowedApplications(id: number): Promise<boolean> {
    const response = await this.allowedApplicationApi.apiAllowedApplicationDeleteApplicationIdDelete(
      id
    );

    return (response.data as unknown) as boolean;
  }

  async addEditAllowedApplications(
    id: number | undefined,
    editing: boolean,
    appName: string,
    appVersion?: string
  ): Promise<boolean> {
    let response: AxiosResponse<unknown>;

    if (editing) {
      response = await this.allowedApplicationApi.apiAllowedApplicationUpdateApplicationPut(
        {
          recordId: id!,
          applicationName: appName,
          applicationVersion: appVersion,
        }
      );
    } else {
      response = await this.allowedApplicationApi.apiAllowedApplicationInsertApplicationPost(
        {
          applicationName: appName,
          applicationVersion: appVersion === undefined ? null : appVersion,
        }
      );
    }

    return response.data as boolean;
  }

  // Application License
  async getApplicationLicense(): Promise<Array<AppLicense>> {
    const response = await this.applicationLicenseApi.apiApplicationLicenseGetApplicationsLicensesGet();

    return (response.data as unknown) as Array<AppLicense>;
  }

  async addEditApplicationLicense(
    id: number | undefined,
    editing: boolean,
    appName: string | null,
    noLicenses: number
  ): Promise<boolean> {
    let response: AxiosResponse<unknown>;

    if (editing) {
      response = await this.applicationLicenseApi.apiApplicationLicenseUpdateApplicationLicensePut(
        {
          recordId: id!,
          noLicenses,
        }
      );
    } else {
      response = await this.applicationLicenseApi.apiApplicationLicenseInsertApplicationLicensePost(
        {
          applicationId: id!,
          noLicenses: noLicenses,
        }
      );
    }

    return response.data as boolean;
  }

  async deleteApplicationLicense(id: number | undefined): Promise<boolean> {
    const response = await this.applicationLicenseApi.apiApplicationLicenseDeleteApplicationLicenseIdDelete(
      id!
    );

    return (response.data as unknown) as boolean;
  }

  async getAllowedAppsWithNoLicense(): Promise<Array<AllowedApps>> {
    const response = await this.applicationLicenseApi.apiApplicationLicenseGetAllowedApplicationsWithoutLicenseGet();

    return (response.data as unknown) as Array<AllowedApps>;
  }

  //Web Applications
  async getAllWebApps(): Promise<Array<webApps>> {
    const response = await this.webAppMonitoringApi.apiWebAppMonitoringGetAllWebAppsGet();

    return ((response.data as unknown) as { data: Array<webApps> }).data;
  }

  async DeleteWebApp(id: number | undefined): Promise<boolean> {
    const response = await this.webAppMonitoringApi.apiWebAppMonitoringDeleteWebApplicationIdDelete(
      id!
    );

    return (response.data as unknown) as boolean;
  }

  async addEditWebApps(
    id: number | undefined,
    editing: boolean,
    appName: string | null,
    url: string
  ): Promise<boolean> {
    let response: AxiosResponse<unknown>;

    if (editing) {
      response = await this.webAppMonitoringApi.apiWebAppMonitoringUpdateWebAppPut(
        {
          id: id!,
          applicationName: appName!,
          url,
          description: "",
        }
      );
    } else {
      response = await this.webAppMonitoringApi.apiWebAppMonitoringInsertWebAppPost(
        {
          applicationName: appName!,
          url,
          description: "",
        }
      );
    }

    return response.data as boolean;
  }

  // Time Utilization
  async getTimeUtilizationData(
    id: number,
    date: Date
  ): Promise<Array<TimeUtil>> {
    const response = await this.graphsApi.apiGraphsGetApdAppUsageComputerIdGet(
      id,
      AuthedClient.dateInQueryParam(date)
    );

    return (response.data as unknown) as Array<TimeUtil>;
  }

  // Admin Management
  async getUsersAdmins(): Promise<GetUsersAdmins> {
    const response = await this.userApi.apiUserGetAdminsListGet();

    return (response.data as unknown) as GetUsersAdmins;
  }

  async updateUserAdmins(
    id: string | undefined,
    fullName: string,
    title: string,
    phoneNumber: string,
    email: string
  ): Promise<boolean> {
    const user = localStorage.getItem("user");
    const userobj = user !== null && JSON.parse(user);
    const response = await axios.put(
      `https://flyworex.azurewebsites.net/api/User/UpdateAdmin`,
      {
        id,
        fullName,
        title,
        phoneNumber,
        email,
      },
      { headers: { Authorization: `Bearer ${userobj.token}` } }
    );

    return response.data as boolean;
  }

  async postUsersAdmins(
    username: string,
    email: string,
    password: string,
    fullName: string,
    phoneNumber: string,
    title: string
  ) {
    return await this.authenticateApi.apiAuthenticateRegisterAdminPost({
      username,
      email,
      password,
      fullName,
      phoneNumber,
      title,
    });
  }

  async resetUsersAdminsPassword(id: string, newPassword: string) {
    const user = localStorage.getItem("user");
    const userobj = user !== null && JSON.parse(user);
    const response = await axios.put(
      `https://flyworex.azurewebsites.net/api/User/ResetPassword`,
      {
        id,
        newPassword,
      },
      { headers: { Authorization: `Bearer ${userobj.token}` } }
    );

    return response.data as boolean;
  }

  async deleteAdmin(id: string) {
    const user = localStorage.getItem("user");
    const userObj = user !== null && JSON.parse(user);
    const response = await axios.delete(
      `https://flyworex.azurewebsites.net/api/User/DeleteAdmin?id=${id}`,
      { headers: { Authorization: `Bearer ${userObj.token}` } }
    );

    return response.data as boolean;
  }

  async getAdminSummary(id: string) {
    const user = localStorage.getItem("user");
    const userObj = user !== null && JSON.parse(user);
    const response = await axios.get(
      `https://flyworex.azurewebsites.net/api/User/GetAdminSummary?id=${id}`,
      { headers: { Authorization: `Bearer ${userObj.token}` } }
    );

    return response.data;
  }

  // Profile Component
  async changeUserPassword(
    oldPass: string,
    newPass: string
  ): Promise<PassChangeResult> {
    const user = localStorage.getItem("user");
    const userobj = user !== null && JSON.parse(user);
    const response = await axios.put(
      `https://flyworex.azurewebsites.net/api/User/ChangePassword
    `,
      {
        oldPassword: oldPass,
        newPassword: newPass,
      },
      { headers: { Authorization: `Bearer ${userobj.token}` } }
    );
    return response.data;
  }

  async getCurrentProfileSummary() {
    const user = localStorage.getItem("user");
    const userObject = user !== null && JSON.parse(user);
    const response = await axios.get(
      `https://flyworex.azurewebsites.net/api/User/GetCurrentProfileSummary`,
      { headers: { Authorization: `Bearer ${userObject.token}` } }
    );

    return response.data;
  }
}

export default AuthedClient;
