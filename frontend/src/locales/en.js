export default {
  translation: {
    local: 'Русский',
    toast: {
      createChannel: 'Channel create.',
      renameChannel: 'Channel renamed.',
      removeChannel: 'Channel deleted.',
    },
    form: {
      required: 'Required field.',
      username: 'Username',
      message: 'Enter your message',
      password: 'Password',
      name: 'Enter channel name',
      showPassword: 'Show password',
      confirmPassword: 'Password confirmation',
      showConfirmPassword: 'Show password confirmation',
      mustMutch: 'Passwords must match.',
      passMin: 'The password must contain at least 6 characters.',
      passMinLowercase: 'The password must contain at least 1 lowercase character.',
      passMinUppercase: 'The password must contain at least 1 uppercase character.',
      passMinNumbers: 'The password must contain at least 1 digit.',
      passMinSymbols: 'The password must contain at least 1 special character.',
      usernameConstraints: 'The username must contain from 3 to 20 characters.',
      unique: 'A channel with the same name already exists.',
    },
    channels: {
      channels: 'Channels',
      addChannel: 'Add channel',
      removeChannel: 'Remove',
      renameChannel: 'Rename',
      allChannels: 'All channels',
      empty: 'No other channels',
    },
    messages: {
      submit: 'Send a message',
      count_one: '{{count}} message',
      count_other: '{{count}} messages',
    },
    modals: {
      submit: 'Send',
      delete: 'Delete',
      cancel: 'Cancel',
      createTitle: 'Create channel',
      renameTitle: 'Rename channel',
      removeTitle: 'Remove channel',
      warning: 'Are you sure you want to delete the channel?',
    },
    login: {
      authorization: 'Authorization',
      submit: 'Log in',
      notAccount: "Don't have an account?",
    },
    signup: {
      registration: 'Registration',
      submit: 'Sign up',
      alreadyRegistered: 'Already registered?',
    },
    logout: 'Log out',
    notFound: {
      title: 'Nothing found',
      text: 'Sorry, an error occurred, the requested page was not found!',
      link: 'Back to home',
    },
    errors: {
      401: 'The specified username and password are not correct.',
      409: 'The specified username is already taken.',
      network: 'Connection error, please reload the page.',
      sendMessage: 'Error sending message.',
      authorization: 'Authorization failed, try logging out and logging in again.',
    },
  },
};
