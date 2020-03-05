import React from 'react';
import { Container, Button } from 'reactstrap';
import PageHeader from '@availity/page-header';
import Spaces from '@availity/spaces';
import BlockUi from 'react-block-ui';
import { Footer, RegistrationForm } from '@/components';
import { useAppStore, useQueryParams } from '@/hooks';

const App = () => {
  const queryParams = useQueryParams();

  const { loading, registered, setRegistered } = useAppStore(store => ({
    loading: store.loading,
    registered: store.registered,
    setRegistered: store.setRegistered
  }));

  return (
    <Container data-testid="sso-container" className="container-sm">
      <Spaces spaceIds={[queryParams.spaceId]} clientId="test">
        <PageHeader appName="Registration" spaceId={queryParams.spaceId} />
        <BlockUi blocking={loading}>
          {registered ? (
            <div>
              {'Thank you for registering.'}
              <Button type="button" color="primary" className="float-right" onClick={() => setRegistered(false)}>
                Register Again
              </Button>
            </div>
          ) : (
            <RegistrationForm />
          )}
        </BlockUi>
      </Spaces>
      <Footer />
    </Container>
  );
};


export default App;
