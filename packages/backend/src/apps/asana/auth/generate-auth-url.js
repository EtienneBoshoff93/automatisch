import { URLSearchParams } from 'node:url';
import crypto from 'node:crypto';

export default async function generateAuthUrl($) {
  const oauthRedirectUrlField = $.app.auth.fields.find(
    (field) => field.key == 'oAuthRedirectUrl'
  );
  const redirectUri = oauthRedirectUrlField.value;
  const state = crypto.randomBytes(100).toString('base64url');

  const searchParams = new URLSearchParams({
    client_id: $.auth.data.clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    state,
  });

  const url = `https://app.asana.com/-/oauth_authorize?${searchParams.toString()}`;

  await $.auth.set({
    url,
    originalState: state,
  });
}
