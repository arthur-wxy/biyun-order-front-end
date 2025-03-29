import styled from 'styled-components';
import { Layout } from 'antd';

const { Header, Sider, Content } = Layout;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export const StyledSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
`;

export const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0;
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - ${props => props.$siderWidth}px);
  z-index: 9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: width 0.2s;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .trigger {
    padding: 0 24px;
    font-size: 18px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: ${props => props.theme.primaryColor};
    }
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  padding-right: 24px;
`;

export const StyledContent = styled(Content)`
  margin-top: 64px;
  margin-left: ${props => props.$siderWidth}px;
  padding: 24px;
  min-height: calc(100vh - 64px);
  background: #fff;
  transition: margin-left 0.2s;
`;

export const ContentWrapper = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 4px;
  min-height: 100%;
`;

export const InnerLayout = styled(Layout)`
  margin-left: ${props => props.$siderWidth}px;
  transition: margin-left 0.2s;
`; 