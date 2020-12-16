import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  height: 10rem;
  background: ${(props) => props.theme.backgroundColors.main};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Nav = styled.nav`
  width: 85%;
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
  color: white;
  font-size: 2rem;
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
    color: white;
    transition: all 0.35s linear;
    font-size: 1.6rem;

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
