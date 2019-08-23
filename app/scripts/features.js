export const Features = {
  isErrorReportingEnabled() {
    return process.env.NODE_ENV !== 'production';
  },
};
