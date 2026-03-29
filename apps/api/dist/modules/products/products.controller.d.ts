import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { ProductListDto, ProductResponseDto } from './dto/response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<import("./dto/response.dto").CreateProductResponseDto>;
    findAll(dto: FindProductsDto, req: any): Promise<import("src/common/response/paginated-response.dto").PaginatedResponse<ProductListDto>>;
    findOne(id: string, req: any): Promise<ProductResponseDto>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): string;
}
