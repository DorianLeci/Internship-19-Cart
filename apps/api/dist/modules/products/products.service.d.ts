import { PrismaService } from '@prisma/prisma.service';
import { PaginatedResponse } from 'src/common/response/paginated-response.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { CreateProductResponseDto, ProductListDto, ProductResponseDto } from './dto/response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateProductDto): Promise<CreateProductResponseDto>;
    findProducts(query: FindProductsDto, userId: string | null): Promise<PaginatedResponse<ProductListDto>>;
    findOne(productId: string, userId: string): Promise<ProductResponseDto>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): string;
}
