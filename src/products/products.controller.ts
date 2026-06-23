import { Controller, Get, Query } from '@nestjs/common';

import { createApiResponse } from 'src/common/decorators/api-response.decorator';
import { PaginationQueryDto } from './dto/pagination-query.tdo';

@Controller('products')
export class ProductsController {
  private products = [
    { id: 1, name: 'Laptop Dell', category: 'electronics', price: 15000000 },
    { id: 2, name: 'iPhone 15', category: 'electronics', price: 25000000 },
    { id: 3, name: 'Áo thun', category: 'clothing', price: 200000 },
    { id: 4, name: 'Quần jean', category: 'clothing', price: 500000 },
  ];

  @Get()
  getAllProducts() {
    return createApiResponse(
      this.products,
      'Lay danh sach san pham thanh cong',
    );
  }

  @Get('search')
  searchProducts(
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    let filteredProducts = this.products;
    // loc theo category
    if (category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === category,
      );
    }

    if (minPrice) {
      const min = parseInt(minPrice);
      filteredProducts = filteredProducts.filter((p) => p.price >= min);
    }

    if (maxPrice) {
      const max = parseInt(maxPrice);
      filteredProducts = filteredProducts.filter((p) => p.price <= max);
    }

    return {
      status: 'success',
      data: filteredProducts,
      filters: { category, minPrice, maxPrice },
      count: filteredProducts.length,
    };
  }

  @Get('articles')
  getArticles(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    // gỉa lập dữ liệu và tính toán pagination
    const totalItems = 100; // tổng số bài viết
    const totalPage = Math.ceil(totalItems / limitNum);

    return {
      data: [],
      currentPage: pageNum,
      itemsPerPage: limitNum,
      totalItems,
      totalPage,
      hasNextPage: pageNum < totalPage,
      hasPreviousPage: pageNum > 1,
    };
  }

  @Get('products-dto')
  getProductsWithDto(@Query() paginationDto: PaginationQueryDto) {
    const { page, limit } = paginationDto;

    const offset = (page - 1) * limit;

    const total = 150;
    const totalPage = Math.ceil(total / limit);

    return {
      data: [],
      meta: {
        page,
        limit,
        total,
        totalPage,
        hasNextPage: page < totalPage,
        hasPreviousPage: page > 1,
      },
    };
  }
}
