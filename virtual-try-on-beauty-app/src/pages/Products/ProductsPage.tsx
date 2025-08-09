import React from 'react';
import styled from 'styled-components';
import { useProducts } from '../../contexts/ProductContext';

const ProductsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 3rem;
  font-size: 2.5rem;
  text-align: center;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.md};
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${props => props.theme.colors.gradient};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ProductName = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
`;

const ProductBrand = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const ProductPrice = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const ColorPreview = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ColorSwatch = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 2px solid ${props => props.theme.colors.border};
`;

const TryButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

const ProductsPage: React.FC = () => {
  const { filteredProducts } = useProducts();

  const getProductEmoji = (type: string) => {
    switch (type) {
      case 'lipstick': return '💄';
      case 'eyeshadow': return '🎨';
      case 'foundation': return '🧴';
      default: return '✨';
    }
  };

  return (
    <ProductsContainer>
      <Title>Beauty Products</Title>
      <ProductsGrid>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage>
              {getProductEmoji(product.type)}
            </ProductImage>
            <ProductName>{product.name}</ProductName>
            <ProductBrand>{product.brand}</ProductBrand>
            <ProductPrice>${product.price}</ProductPrice>
            <ColorPreview>
              {product.colors.slice(0, 5).map((color) => (
                <ColorSwatch
                  key={color.id}
                  color={color.hex}
                  title={color.name}
                />
              ))}
            </ColorPreview>
            <TryButton>
              Try Virtual
            </TryButton>
          </ProductCard>
        ))}
      </ProductsGrid>
    </ProductsContainer>
  );
};

export default ProductsPage;