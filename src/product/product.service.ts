import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProduct(productID: string): Promise<Product> {
    const product = await this.productModel.findById(productID);
    return product;
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const productNew = await new this.productModel(createProductDTO);
    return productNew;
  }

  async DeleteProduct(productID: string): Promise<Product> {
    const productDelete = await this.productModel.findByIdAndDelete(productID);
    return productDelete;
  }

  async UpdateProduct(productID: string): Promise<Product> {
    const productUpdate = await this.productModel.findByIdAndUpdate(productID);
    return productUpdate;
  }
}
