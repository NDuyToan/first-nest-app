import { Controller, Get, Query } from '@nestjs/common';

import { createApiResponse } from 'src/common/decorators/api-response.decorator';

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
}
