import styled from 'styled-components';
import { Image } from 'antd';

export const HeaderContainer = styled.div`
  padding: ${({ collapsed }) => collapsed ? '8px' : '16px'};
  background: ${({ theme }) => theme.siderHeaderBg || 'rgba(255, 255, 255, 0.1)'};
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px; // 与 Header 高度一致
  
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  max-width: ${({ collapsed }) => collapsed ? '32px' : '200px'};
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.02);
  }
`; 