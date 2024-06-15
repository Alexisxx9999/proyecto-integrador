const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }
  generate() {
    /* genera productos dinamicamente  */
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }
  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 2000);
    });
  }
  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }
  async update(id, change) {
    const index = this.products.findIndex(
      (item) => item.id === id,
    ); /* posicion del objeto*/ /* obtengo la posicion del usuario a traves de su posicion en el objeto  */
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...change,
    };
    return this.products[index];
  }
  async delete(id) {
    const index = this.products.findIndex(
      (item) => item.id === id,
    ); /* posicion del objeto*/
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}
module.exports = ProductService;
/*   */
