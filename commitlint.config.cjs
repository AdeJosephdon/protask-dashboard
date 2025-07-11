module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-min-length': [2, 'always', 20],
    'header-case': [2, 'always', 'sentence-case'],
    'subject-full-stop': [0],
    'type-empty': [0],
    'subject-empty': [0],
  },
};
