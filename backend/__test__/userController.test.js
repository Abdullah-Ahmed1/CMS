const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const { createUser, createToken,findUser,passCheck } = require("../dao/userControllerDao");
//  const jest = require('@jest/globals')

jest.mock("../dao/userControllerDao");

const mockResponse = {
  _id: "64143d1ad4baef303c9cb463",
  firstname: "abdullah",
  lastname: "ahmed",
  email: "abdullah.ahmed1000001+9@gmail.com",
  position: "tester",
  password: "$2a$10$zulk7Ux2luNo4Upmk0B.qO/fYdI3xrOQOj5dAET9XNlSCu5jtUToO",
};

describe("testing endpoints for user controller", () => {
  describe("testing register endpoint", () => {
    test("if email is not present return statuscode for 400", async () => {
      const response = await request(app).post("/register").send({
        firstname: "abdullah",
        lastname: "ahmed",
        email: "",
        position: "tester",
        password:
          "$2a$10$zulk7Ux2luNo4Upmk0B.qO/fYdI3xrOQOj5dAET9XNlSCu5jtUToO",
      });
      expect(response.statusCode).toBe(400);
    });

    test("if password is not not present or not valid return statuscode for 400", async () => {
      const response = await request(app).post("/register").send({
        firstname: "abdullah",
        lastname: "ahmed",
        email: "abdullah.ahmed10001@gmail.com",
        position: "tester",
        password: "$2a$10",
      });
      expect(response.statusCode).toBe(400);
    });


    test("if all the data in request is valid then createUser and createToken function should be called once", async () => {
      createUser.mockImplementationOnce(() => {
        return mockResponse;
      });
      createToken.mockImplementationOnce(() => {
        return {
          _id: "6459f5e9ee228fc580ed52f6",
          userId: "6459f5e9ee228fc580ed52f6",
          token:
            "a3c82e096026313773df4bd1f6152d12f83a7610a2d8bd5b53eafcd3ec45e1a9",
        };
      });
      const response = await request(app).post("/register").send({
        firstname: "abdullah",
        lastname: "ahmed",
        email: "abdullah.ahmed10001+7@gmail.com",
        position: "tester",
        password: "$2a$10$zulk7Ux2luNo4Upmk0B.qO/fYdI3xrOQOj5dAET9XNlSCu5jtUToO",
      });
      expect(createUser).toHaveBeenCalledTimes(1);
      expect(createToken).toHaveBeenCalledTimes(1);
    });
  });


  

  describe('testing for login endpoint',()=>{
    test('if email is not found in db',async ()=>{
      findUser.mockImplementationOnce(() => {
        return null 
        // {
        //   _id:"6459f5e9ee228fc580ed52f6" ,
        //   firstname: "abdullah",
        //   lastname: "ahmed",
        //   email: "abdullah.ahmed10001+7@gmail.com",
        //   position: "tester",
        //   password: "$2a$10$zulk7Ux2luNo4Upmk0B.qO/fYdI3xrOQOj5dAET9XNlSCu5jtUToO", 
        //   verified:true
        // }
      });

      passCheck.mockImplementationOnce(()=>{
        return true
      })
      
     
      const response = await request(app).post("/login").send({
        email: "abdullah.ahmed10001+7@gmail.com",
        password: "$2a$10$zulk7Ux2luNo4Upmk0B.qO/fYdI3xrOQOj5dAET9XNlSCu5jtUToO",
      });
     

      expect(response.statusCode).toBe(400)
    })

    test('if email is found in db and also pass is correct',async()=>{
      findUser.mockImplementationOnce(() => {
        return {
          _id:"6459f5e9ee228fc580ed52f6" ,
          firstname: "abdullah",
          lastname: "ahmed",
          email: "abdullah.ahmed10001+7@gmail.com",
          position: "tester",
          password: "$2a$10$zulk7Ux2luNo4Upmk0B.qO/fYdI3xrOQOj5dAET9XNlSCu5jtUToO", 
          verified:true
        }
      });

      passCheck.mockImplementationOnce(()=>{
        return true
      })
      
     
      const response = await request(app).post("/login").send({
        email: "abdullah.ahmed10001+7@gmail.com",
        password: "$2a$10$zulk7Ux2luNo4Upmk0B.qO/fYdI3xrOQOj5dAET9XNlSCu5jtUToO",
      });
     

      expect(response.statusCode).toBe(200)
    })

  })
});
