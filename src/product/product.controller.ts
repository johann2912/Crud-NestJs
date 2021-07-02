import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Product Successfully Created',
      product,
    });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    if (!products)
      throw new NotFoundException('There is no product in the list');
    return res.status(HttpStatus.OK).json({
      message: 'All list Products',
      products,
    });
  }

  @Get('/:productId')
  async getProduct(@Res() res, @Param('productId') productId) {
    const product = await this.productService.getProduct(productId);
    if (!product) throw new NotFoundException('Product Does Not Exists');
    return res.status(HttpStatus.OK).json({
      message: 'Successful Product Search',
      product,
    });
  }

  @Delete('/delete/:productId')
  async productDelete(@Res() res, @Param('productId') productId) {
    const productDelete = await this.productService.DeleteProduct(productId);
    if (!productDelete) throw new NotFoundException('Product Does Not Exists');
    return res.status(HttpStatus.OK).json({
      message: 'Delete Product Succesfully',
      product: productDelete,
    });
  }

  @Put('/update/:productId')
  async productUpdate(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Param('productId') productId,
  ) {
    const productUpdate = await this.productService.UpdateProduct(
      productId,
      createProductDTO,
    );
    if (!productUpdate) throw new NotFoundException('Product Does Not Exist');
    return res.status(HttpStatus.OK).json({
      message: 'Updating Product Succerfully',
      product: productUpdate,
    });
  }
}
