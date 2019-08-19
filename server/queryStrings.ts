export const productJoin: string = `
  SELECT
    product.id,
    brand.name AS brand,
    product.name,
    category.name AS category,
    product.description,
    product.price,
    product.images
  FROM
    product
  JOIN brand ON product.brand_id = brand.id
  JOIN category ON product.category_id = category.id
  JOIN color ON product.color_id = color.id
`;