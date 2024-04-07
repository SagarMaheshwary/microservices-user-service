import { EntityNotFoundError } from "typeorm";
import { ExceptionType, ResponseMessage } from "../../constants/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Test } from "@nestjs/testing";
import { User } from "./user.entity";
import { UnauthorizedException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { plainToInstance } from "class-transformer";
import { StoreRequestDTO } from "./dto/store-request.dto";
import { useContainer, validate } from "class-validator";
import { AppModule } from "../../app.module";

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    findById: jest.fn((id) => {
      if (id != mockUser.id) {
        throw new EntityNotFoundError(User, "id");
      }

      return mockUser;
    }),
    findByCredential: jest.fn((email, password) => {
      if (email != mockUser.email) {
        throw new EntityNotFoundError(User, "email");
      } else if (password != "password123") {
        throw new UnauthorizedException();
      }

      return mockUser;
    }),
    store: jest.fn((dto) => {
      return {
        ...mockUser,
        name: dto.name,
        email: dto.email,
      };
    }),
  };

  const mockUser = {
    id: 1,
    name: "Daniel",
    email: "daniel@gmail.com",
    created_at: "2024-04-07T16:49:28.458Z",
    updated_at: null,
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  it("should be defined", async () => {
    expect(userController).toBeDefined();
  });

  describe("FindById", () => {
    it("should return user", async () => {
      expect(await userController.findById({ id: 1 })).toEqual({
        message: ResponseMessage.OK,
        data: {
          user: mockUser,
        },
      });

      expect(mockUserService.findById).toHaveBeenCalled();
    });

    it("should throw not found exception on wrong id", async () => {
      expect.assertions(2);

      try {
        await userController.findById({ id: 2 });
      } catch (err) {
        expect(err).toBeInstanceOf(RpcException);

        expect(err.getError()).toHaveProperty(
          "name",
          ExceptionType.ENTITY_NOT_FOUND_ERROR,
        );
      }
    });
  });

  describe("FindByCredential", () => {
    it("should find user by matching their email and password", async () => {
      expect(
        await userController.findByCredendial({
          email: "daniel@gmail.com",
          password: "password123",
        }),
      ).toEqual({
        message: ResponseMessage.OK,
        data: {
          user: mockUser,
        },
      });

      expect(mockUserService.findByCredential).toHaveBeenCalled();
    });

    it("should throw not found exception on wrong email", async () => {
      expect.assertions(2);

      try {
        await userController.findByCredendial({
          email: "john@gmail.com",
          password: "password123",
        });
      } catch (err) {
        expect(err).toBeInstanceOf(RpcException);
        expect(err.getError()).toHaveProperty(
          "name",
          ExceptionType.ENTITY_NOT_FOUND_ERROR,
        );
      }
    });

    it("should throw unauthorized exception on wrong password", async () => {
      expect.assertions(2);

      try {
        await userController.findByCredendial({
          email: "daniel@gmail.com",
          password: "password",
        });
      } catch (err) {
        expect(err).toBeInstanceOf(RpcException);
        expect(err.getError()).toHaveProperty(
          "name",
          ExceptionType.UNAUTHORIZED_EXCEPTION,
        );
      }
    });
  });

  describe("Store", () => {
    it("should create a user", async () => {
      const dto = {
        name: "Daniel",
        email: "daniel@gmail.com",
        password: "password123",
      };

      expect(await userController.store(dto)).toEqual({
        message: ResponseMessage.CREATED,
        data: {
          user: {
            ...mockUser,
            name: dto.name,
            email: dto.email,
          },
        },
      });
    });
  });
});
