import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { WishlistService } from './wishlist.service.js';

describe('WishlistService', () => {
  let service: WishlistService;
  const httpMock = {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        WishlistService,
        { provide: HttpService, useValue: httpMock },
        {
          provide: ConfigService,
          useValue: { get: () => 'http://localhost:3001' },
        },
      ],
    }).compile();

    service = moduleRef.get(WishlistService);
    vi.clearAllMocks();
  });

  it('list reenvía el filtro q al backend', async () => {
    httpMock.get.mockReturnValue(of({ data: [] }));

    await service.list(' metroid ');

    expect(httpMock.get).toHaveBeenCalledWith(
      'http://localhost:3001/wishlist',
      { params: { q: 'metroid' } },
    );
  });

  it('addPrice apunta a las páginas de tienda del artículo', async () => {
    httpMock.post.mockReturnValue(of({ data: { id: 9 } }));

    const result = await service.addPrice(3, { url: 'https://x.test/a' });

    expect(result).toEqual({ id: 9 });
    expect(httpMock.post).toHaveBeenCalledWith(
      'http://localhost:3001/wishlist/3/prices',
      { url: 'https://x.test/a' },
    );
  });

  it('removePrice usa la ruta de precios', async () => {
    httpMock.delete.mockReturnValue(of({ data: { deleted: true } }));

    await service.removePrice(7);

    expect(httpMock.delete).toHaveBeenCalledWith(
      'http://localhost:3001/wishlist/prices/7',
    );
  });

  it('refreshAll consulta el refresco global', async () => {
    httpMock.post.mockReturnValue(of({ data: { updated: 1, failed: 0 } }));

    const result = await service.refreshAll();

    expect(result).toEqual({ updated: 1, failed: 0 });
    expect(httpMock.post).toHaveBeenCalledWith(
      'http://localhost:3001/wishlist/refresh',
      {},
    );
  });
});
