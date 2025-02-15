import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { withServerErrorCode } from '@plone/volto/helpers/Utils/Utils';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';

const Unauthorized = () => {
  const error_message = useSelector((state) => state.apierror?.message);
  let location = useLocation();

  return (
    <Container className="view-wrapper">
      <h1>
        <FormattedMessage id="Unauthorized" defaultMessage="Unauthorized" />
      </h1>
      <h3>{error_message}</h3>
      <p className="description">
        <FormattedMessage
          id="You are trying to access a protected resource, please {login} first."
          defaultMessage="You are trying to access a protected resource, please {login} first."
          values={{
            login: (
              <Link
                to={{
                  pathname: `${getBaseUrl(location.pathname)}/login`,
                  state: {
                    // This is needed to cover the use case of being logged in in
                    // another backend (eg. in development), having a token for
                    // localhost and try to use it, the login route has to know that
                    // it's the same as it comes from a logout
                    isLogout: true,
                  },
                }}
              >
                <FormattedMessage id="log in" defaultMessage="log in" />
              </Link>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage
          id="If you are certain you have the correct web address but are encountering an error, please contact the {site_admin}."
          defaultMessage="If you are certain you have the correct web address but are encountering an error, please contact the {site_admin}."
          values={{
            site_admin: (
              <Link to="/contact-form">
                <FormattedMessage
                  id="Site Administration"
                  defaultMessage="Site Administration"
                />
              </Link>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage id="Thank you." defaultMessage="Thank you." />
      </p>
    </Container>
  );
};

export default withServerErrorCode(401)(Unauthorized);
