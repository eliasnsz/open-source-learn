import { describe, expect, beforeAll, afterAll, it } from "vitest";
import { app } from "../../src/server";

import orchestrator from "../orchestrator";
import request from "supertest";
import prisma from "../../src/models/connectToDatabase";
import { compareSync } from "bcrypt";

beforeAll(async () => {
  await orchestrator.dropAllUsers();
});

describe("Teste de registro e login do usuario", async () => {

  it("Deve registrar um novo usuario com sucesso", async () => {
    const userData = {
      name: "johndoe",
      email: "johndoe@example.com",
      password: "mysecretpassword",
    };

    const response = await request(app)
      .post("/users/register")
      .send(userData)
      .expect(201);

    expect(response.statusCode).toEqual(201);
    
    const userCreatedInDb = await prisma.user.findUnique({ 
      where: { name: "johndoe" }
    });
    
    expect(userCreatedInDb?.name).toBe("johndoe");
    expect(userCreatedInDb?.email).toBe("johndoe@example.com");
    expect(compareSync("mysecretpassword", userCreatedInDb?.password as string))
      .toBeTruthy();
  });

  it("Deve falhar no login por estar com a senha incorreta", async () => {
    const userData = {
      name: "johndoe",
      password: "incorrectPassword",
    };

    const response = await request(app)
      .post("/users/login")
      .send(userData)
      .expect(401);

    expect(response.statusCode).toEqual(401);    
    expect(response.body.message).toStrictEqual("Senha incorreta");    
  });

  it("Deve falhar ao tentar a entrar na rota session por nao estar logado", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", "invalid token")
      .expect(403);
    
    expect(response.statusCode).toEqual(403);
  });

  let token: { token: string };

  it("Deve fazer login com sucesso", async () => {
    const userData = {
      name: "johndoe",
      password: "mysecretpassword",
    };

    const response = await request(app)
      .post("/users/login")
      .send(userData)
      .expect(200);
    
    expect(response.statusCode).toEqual(200);    
    token = response.body;
  });

  it("Deve retornar as informacoes com sucesso pois esta logado", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token.token}`)
      .expect(200);
    
    expect(response.statusCode).toEqual(200);
    expect(response.body.user).keys([ "created_at", "email", "id", "name" ]);
  });

  it("Deve deslogar com sucesso", async () => {
    const response = await request(app)
      .get("/users/logout")
      .set("Authorization", `Bearer ${token.token}`)
      .expect(200);

    expect(response.statusCode).toEqual(200);
  });
  
});

afterAll(async () => {
  await orchestrator.dropAllUsers();
});