import { productsDao } from '../../../domain/dao'
import type { FullProduct } from '../../../domain/dao/products/types'

export const list = async (): Promise<FullProduct[]> => {
    return productsDao.getAll()
}
