import { __awaiter } from "tslib";
import { isClientKey, isAccessToken } from './common/methods';
import { BIKETAG_API_PREFIX, AUTHORIZE_ENDPOINT } from './common/endpoints';
export function getAuthorizationHeader(client) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isAccessToken(client.credentials)) {
            return `Bearer ${client.credentials.accessToken}`;
        }
        if (isClientKey(client.credentials) && !isAccessToken(client.credentials)) {
            return `Client-ID ${client.credentials.clientKey}`;
        }
        const { clientId, username, password } = client.credentials;
        const options = {
            url: AUTHORIZE_ENDPOINT,
            baseURL: BIKETAG_API_PREFIX,
            params: {
                client_id: clientId,
                response_type: 'token',
            },
        };
        let response = yield client.plainRequest(options);
        const cookies = Array.isArray(response.headers['set-cookie'])
            ? response.headers['set-cookie'][0]
            : response.headers['set-cookie'];
        if (!cookies) {
            throw new Error('No cookies were set during authorization');
        }
        const matches = cookies.match('(^|;)[s]*authorize_token=([^;]*)');
        if (!matches || matches.length < 3) {
            throw new Error('Unable to find authorize_token cookie');
        }
        const authorizeToken = matches[2];
        options.method = 'POST';
        options.data = {
            username,
            password,
            allow: authorizeToken,
        };
        options.followRedirect = false;
        options.headers = {
            cookie: `authorize_token=${authorizeToken}`,
        };
        response = yield client.plainRequest(options);
        const location = response.headers.location;
        if (!location) {
            throw new Error('Unable to parse location');
        }
        const token = JSON.parse('{"' +
            decodeURI(location.slice(location.indexOf('#') + 1))
                .replace(/"/g, '\\"')
                .replace(/&/g, '","')
                .replace(/=/g, '":"') +
            '"}');
        const clientToken = token.access_token;
        client.credentials.clientToken = clientToken;
        return `Bearer ${clientToken}`;
    });
}
//# sourceMappingURL=getAuthorizationHeader.js.map