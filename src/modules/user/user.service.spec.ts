import { Test } from "@nestjs/testing";
import { UserService } from "./user.service";
import { USER_REPOSITORY } from "../../constants/database";
import { ConfigService } from "@nestjs/config";
import { EntityNotFoundError } from "typeorm";
import { User } from "./user.entity";
import { UnauthorizedException } from "@nestjs/common";
import config from "../../config";
import { Hash } from "../../lib/hash";

describe("UserService", () => {
  let service: UserService;

  const mockUserRepository = {
    findOne: jest.fn(({ id }) => {
      if (id !== mockUser.id) {
        throw new EntityNotFoundError(User, "id");
      }

      return Promise.resolve(mockUser);
    }),
    findOneByOrFail: jest.fn(({ id, email }) => {
      if (id !== undefined && id !== mockUser.id) {
        throw new EntityNotFoundError(User, "id");
      }

      if (email !== undefined && email !== mockUser.email) {
        throw new EntityNotFoundError(User, "email");
      }

      return Promise.resolve(mockUser);
    }),
    save: jest.fn((user, options = {}) => {
      return Promise.resolve({ ...mockUser, ...user });
    }),
  };

  const mockHash = {
    make: jest.fn((hash) => hash),
    compare: jest.fn((text, hash) => text === hash),
  };

  const mockUser = {
    id: 1,
    name: "Daniel",
    email: "daniel@gmail.com",
    password: "password123",
    created_at: "2024-04-07T16:49:28.458Z",
    updated_at: null,
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
        {
          provide: ConfigService,
          useValue: new ConfigService(config()),
        },
        {
          provide: Hash,
          useValue: mockHash,
        },
      ],
    }).compile();

    service = moduleRef.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findById", () => {
    it("should return user by id", async () => {
      expect(await service.findById(1)).toEqual(mockUser);
    });

    it("should throw entity not found exception on wrong id", async () => {
      try {
        await service.findById(2);
      } catch (err) {
        expect(err).toBeInstanceOf(EntityNotFoundError);
      }
    });
  });

  describe("findByEmail", () => {
    it("should return user by email", async () => {
      expect(await service.findByEmail("daniel@gmail.com")).toEqual(mockUser);
    });

    it("should throw entity not found exception on wrong email", async () => {
      try {
        await service.findByEmail("john@gmail.com");
      } catch (err) {
        expect(err).toBeInstanceOf(EntityNotFoundError);
      }
    });
  });

  describe("findByCredential", () => {
    it("should return user by matching their email and password", async () => {
      expect(
        await service.findByCredential("daniel@gmail.com", "password123"),
      ).toEqual(mockUser);
    });

    it("should throw entity not found exception on wrong email", async () => {
      try {
        await service.findByCredential("john@gmail.com", "");
      } catch (err) {
        expect(err).toBeInstanceOf(EntityNotFoundError);
      }
    });

    it("should throw unauthorized exception on wrong password", async () => {
      try {
        await service.findByCredential("daniel@gmail.com", "password321");
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
      }
    });
  });

  describe("store", () => {
    it("store and return the newly created user", async () => {
      const dto = {
        name: "Daniel",
        email: "daniel@gmail.com",
        password: "password123",
      };
      expect(await service.store(dto)).toEqual(mockUser);
    });
  });
});
