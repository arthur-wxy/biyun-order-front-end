import styled from 'styled-components';
import { Layout } from 'antd';

const { Header, Content, Sider } = Layout;

export const StyledLayout = styled(Layout)`
  height: 100vh;
`;

export const StyledSider = styled(Sider)`
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: ${props => props.theme.zIndex.fixed + 1};
  
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    position: absolute;
    transform: translateX(${props => props.collapsed ? '-100%' : '0'});
    transition: transform ${props => props.theme.transitions.normal};
  }
`;

export const StyledHeader = styled(Header)`
  background: ${props => props.theme.colors.background};
  padding: 0 ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${props => props.theme.shadows.sm};
  position: fixed;
  top: 0;
  right: 0;
  width: ${props => `calc(100% - ${props.$siderWidth}px)`};
  transition: width ${props => props.theme.transitions.normal}, 
              left ${props => props.theme.transitions.normal};
  z-index: ${props => props.theme.zIndex.sticky};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.md};
    width: 100%;
  }
`;

export const StyledContent = styled(Content)`
  margin-top: 64px; // Header 的高度
  min-height: calc(100vh - 64px);
  padding: ${props => props.theme.spacing.lg};
  background: #f0f2f5;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const ContentWrapper = styled.div`
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  min-height: 100%;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const InnerLayout = styled(Layout)`
  margin-left: ${props => `${props.$siderWidth}px`};
  transition: margin-left ${props => props.theme.transitions.normal};
  min-height: 100vh;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-left: 0;
  }
`; 