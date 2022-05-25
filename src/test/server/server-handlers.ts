import { rest } from "msw";
import { baseURL } from "../../client/baseURL";
import { LoginDto } from "../../generated/v1/swagger";
import { LoginResponse } from "../../client/PublicClient";
import faker from "@faker-js/faker";
import { aSuperAdminUser } from "../data/users";

export const handlers = [
  rest.post<LoginDto>(`${baseURL}/Authenticate/login`, (req, res, ctx) => {
    const dbUsername = aSuperAdminUser.username;
    const dbPassword = aSuperAdminUser.password;
    const dbRole = aSuperAdminUser.role;

    const { username, password } = req.body;

    if (username === dbUsername && password === dbPassword) {
      const token = faker.random.alphaNumeric(30);
      const expiration = faker.date.soon().toISOString();

      const loginResponse: LoginResponse = {
        expiration,
        token,
        role: dbRole,
        title: "",
        fullName: "",
      };
      return res(ctx.status(200), ctx.json(loginResponse));
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          type: "https://tools.ietf.org/html/rfc7235#section-3.1",
          title: "Unauthorized",
          status: 401,
          traceId: faker.datatype.uuid(),
        })
      );
    }
  }),
];
