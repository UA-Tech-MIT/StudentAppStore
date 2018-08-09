import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';

//Source: https://github.com/benawad/slack-clone-server/blob/8_login_mutation/auth.js

export const createTokens = async (user, secret, secret2) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, ['userHash']),
    },
    secret,
    {
      expiresIn: '1h',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, 'userHash'),
    },
    secret2,
    {
      expiresIn: '7d',
    },
  );

  return [createToken, createRefreshToken];
};

export const refreshTokens = async (token, refreshToken, models, SECRET) => {
  let userId = -1;
  try {
    const { user: { userHash } } = jwt.decode(refreshToken);
    userId = userHash;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await models.User.findOne({ where: { userHash}, raw: true });

  if (!user) {
    return {};
  }

  try {
    jwt.verify(refreshToken, user.refreshSecret);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(user, SECRET, user.refreshSecret);
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

export const tryLogin = async (username, password, models, SECRET, SECRET2) => {
  const user = await models.User.findOne({ where: { username }, raw: true });
  if (!user) {
    // user with provided username not found
    return {
      ok: false,
      errors: [{ path: 'username', message: 'Wrong username' }],
    };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    // bad password
    return {
      ok: false,
      errors: [{ path: 'password', message: 'Wrong password' }],
    };
  }

  const refreshTokenSecret = user.password + SECRET2;

  const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);

  return {
    ok: true,
    token,
    refreshToken,
  };
};