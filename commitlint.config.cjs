module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-min-length': [2, 'always', 20],
    'header-case': [2, 'never', 'sentence-case'],
    'subject-full-stop': [0],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-case': [0],
  },
};
