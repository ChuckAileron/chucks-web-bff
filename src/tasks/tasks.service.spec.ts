import { HttpService } from '@nestjs/axios';
import { BadGatewayException, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { AxiosError } from 'axios';
import { of, throwError } from 'rxjs';
import { TasksService } from './tasks.service.js';

describe('TasksService', () => {
  let service: TasksService;
  const httpMock = {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: HttpService, useValue: httpMock },
        { provide: ConfigService, useValue: { get: () => 'http://localhost:3001' } },
      ],
    }).compile();

    service = moduleRef.get(TasksService);
    vi.clearAllMocks();
  });

  it('findAll unwraps the axios response data', async () => {
    httpMock.get.mockReturnValue(of({ data: [{ id: '1' }] }));

    const result = await service.findAll();

    expect(result).toEqual([{ id: '1' }]);
    expect(httpMock.get).toHaveBeenCalledWith('http://localhost:3001/tasks');
  });

  it('create posts the body to the backend', async () => {
    httpMock.post.mockReturnValue(of({ data: { id: '2', title: 'x' } }));

    const result = await service.create({ title: 'x' });

    expect(result).toEqual({ id: '2', title: 'x' });
    expect(httpMock.post).toHaveBeenCalledWith(
      'http://localhost:3001/tasks',
      { title: 'x' },
    );
  });

  it('maps backend 404 to HttpException', async () => {
    const axiosError = new AxiosError('Not Found');
    axiosError.response = {
      status: 404,
      data: { message: 'Task not found' },
    } as never;
    httpMock.get.mockReturnValue(throwError(() => axiosError));

    const error = await service.findOne('nope').catch((e: unknown) => e);

    expect(error).toBeInstanceOf(HttpException);
    expect((error as HttpException).getStatus()).toBe(404);
  });

  it('maps network errors to BadGatewayException', async () => {
    httpMock.get.mockReturnValue(throwError(() => new Error('boom')));

    await expect(service.findAll()).rejects.toThrow(BadGatewayException);
  });
});
