import styled from 'styled-components';

import { colors } from '@/constant';

export const CardPatientPortalStyle = styled.div`
  box-shadow: 5px 5px 10px rgba(53, 136, 136, 0.12);
  border-radius: 10px;
  padding: 20px;
  max-height: 600px;
  overflow-y: auto;
  
  .btn-cancel {
    padding: 5px 10px;
    border: 1px solid ${ colors.red.default };
    border-radius: 5px;
    color: ${ colors.red.default };
    font-size: 12px;
    font-weight: 700;
    margin: auto 0 auto auto;
    @media screen and (max-width: 640px) {
      margin: auto;
      padding: 8px 16px;
    }
  }

	.btn-success {
    padding: 5px 10px;
    border: 1px solid ${ colors.paradiso.default };
    border-radius: 5px;
    color: ${ colors.paradiso.default };
    font-size: 12px;
    font-weight: 700;
    margin: auto 0 auto auto;
    @media screen and (max-width: 640px) {
      margin: auto;
      padding: 8px 16px;
    }
  }

  .table-wrapper {
    margin: 10px 4px 0 29px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
		@media screen and (max-width: 640px) {
			th {
				font-size: 12px !important;
			}
    }
    th {
      text-align: left;
      font-weight: 700;
      font-size: 16px;
      padding-bottom: 20px;
      border-bottom: 1px solid ${ colors.grey.lighterOpacity }
    }
    td {
      padding-top: 20px;
			@media screen and (max-width: 640px) {
				font-size: 11px;
    	}
    }
  }
`;

export const ModalStyle = styled.div`
  padding: 30px;
  .divider {
    border-top: 1px solid ${ colors.grey.lighterOpacity }
  }
`;

export const VisitHistoryStyle = styled.div`
  background-color: #FAFAFA;
  position: relative;
  .rectangle {
    background: ${ colors.paradiso.opacity10 };
    height: 120px;
    position: absolute;
    top: 0;
    width: 100%;
    @media screen and (max-width: 640px) {
      height: 90px;
    }
  }
  .content-wrapper {
    width: 1110px;
    margin: auto;
  }
  .card {
    display: flex;
    justify-content: space-between;
    box-shadow: 5px 5px 10px rgba(53, 136, 136, 0.12);
    border-radius: 10px;
    padding: 20px;
    position: relative;
    background: white;
    margin-top: -42px;
  }
  .tabs {
    border-right: 1px solid ${ colors.grey.lighter };
  }
  .tabs-menu {
    display: flex;
    flex-direction: column;
    button {
      border-bottom: 1px solid ${ colors.grey.lighter };
    }
  }

  .warning-text {
    width: 100%;
    padding: 25px;
    border-radius: 5px;
    background: ${ colors.paradiso.opacity10 }
  }

  @media screen and (max-width: 1150px) {
    .content-wrapper {
      width: 100%;
      padding: 30px;
    }
  }
`;

export const EmptyResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;