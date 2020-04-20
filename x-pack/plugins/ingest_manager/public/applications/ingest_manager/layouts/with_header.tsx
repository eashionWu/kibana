/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { EuiPage, EuiPageBody, EuiSpacer } from '@elastic/eui';
import { Header, HeaderProps } from '../components';

const Page = styled(EuiPage)`
  background: ${props => props.theme.eui.euiColorEmptyShade};
  flex: 1;
  align-items: flex-start;
`;

interface Props extends HeaderProps {
  restrictWidth?: number;
  children?: React.ReactNode;
}

export const WithHeaderLayout: React.FC<Props> = ({ restrictWidth, children, ...rest }) => (
  <Fragment>
    <Header {...rest} />
    <Page restrictWidth={restrictWidth || 1200}>
      <EuiPageBody>
        <EuiSpacer size="m" />
        {children}
      </EuiPageBody>
    </Page>
  </Fragment>
);
