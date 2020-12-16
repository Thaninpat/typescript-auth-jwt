import styled from 'styled-components';

export const Div = styled.div`
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;

  /* thead {
    border: 1px solid ${(props) => props.theme.colors.lightGrey};
  } */

  th {
    border: 1px solid ${(props) => props.theme.colors.lightGrey};
    margin: 0;
    font-weight: 800;
  }

  td {
    border: 1px solid ${(props) => props.theme.colors.lightGrey};
    margin: 0;
    padding: 0.5rem;
    font-weight: 400;
    text-align: center;

    .true {
      color: ${(props) => props.theme.colors.teal};
    }

    .false {
      color: red;
    }

    .role_action {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-around;
      border: none;

      button {
        margin: 0;
        padding: 0.3rem;
      }
    }
  }

  .td_role {
    background: ${(props) => props.theme.colors.lighterGrey};
  }
`;

export const DeleteBtn = styled.button`
  background: red;
  color: white;

  &:hover {
    background: orange;
  }
`;
