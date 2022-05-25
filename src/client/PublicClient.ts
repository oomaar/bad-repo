import { basePath } from "./basePath";
import { AuthenticateApi } from "../generated/v1/swagger";

export type LoginResponse = {
  role: string;
  token: string;
  expiration: string;
  title: string;
  fullName: string;
};

class PublicClient {
  private readonly authenticateApi: AuthenticateApi;

  constructor() {
    this.authenticateApi = new AuthenticateApi(undefined, basePath);
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await this.authenticateApi.apiAuthenticateLoginPost(
      { username, password },
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );

    const responseBody = response.data as any;

    return {
      role: responseBody.role,
      token: responseBody.token,
      expiration: responseBody.expiration,
      title: responseBody.title,
      fullName: responseBody.fullName,
    };
  }
}

export default PublicClient;
