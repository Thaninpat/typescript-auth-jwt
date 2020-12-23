import styled from 'styled-components';
// import '../../theme/theme-color.css';

export const Header = styled.header`
  width: 100%;
  height: 6rem;
  background: ${(props) => props.theme.backgroundColors.navBg};
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.2px solid #ebebeb;
`;

export const Nav = styled.nav`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${(props) => props.theme.size.md} {
    width: 90%;
  }
`;

export const Logo = styled.div`
  width: 20%;
  margin: 0 auto;
  color: #000;
  font-size: 2.5rem;
  cursor: pointer;

  @media ${(props) => props.theme.size.lg} {
    width: 15%;
  }

  @media ${(props) => props.theme.size.md} {
    width: 10%;
  }

  @media ${(props) => props.theme.size.sm} {
    display: flex;
    justify-content: flex-start;
  }
`;

export const Ul = styled.ul`
  width: 62%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 4rem;

  @media ${(props) => props.theme.size.sm} {
    display: none;
  }

  .active {
    color: ${(props) => props.theme.fontColors.primary};
  }

  a {
    text-decoration: none;
    list-style: none;
    color: ${(props) => props.theme.fontColors.main};
    transition: all 0.35s linear;
    font-size: 1.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Actions = styled.div`
  width: 18%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    background: ${(props) => props.theme.backgroundColors.buttonBg};
    color: white;
    &:hover {
      background: #fff;
      border: 0.5px solid ${(props) => props.theme.colors.border};
      color: ${(props) => props.theme.fontColors.main};
    }
  }

  @media ${(props) => props.theme.size.lg} {
    width: 20%;
  }

  @media ${(props) => props.theme.size.md} {
    width: 25%;
  }

  @media ${(props) => props.theme.size.sm} {
    display: none;
  }
`;

export const HamMenu = styled.div`
  display: none;

  @media ${(props) => props.theme.size.sm} {
    display: block;
  }
`;
