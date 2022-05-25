// A future enhancement to this is to make it like this:
// https://github.com/kentcdodds/bookshelf/tree/main/src/test/data

// Also: I've love to be able to use faker. However, the issue is that when it's re-imported in cypress, it generates
// different data.
// Oh, now I see why Kent is persisting the test DB in local storage. It's probably so that he'd use it in Cypress. Just
// a guess, though.

export const aSuperAdminUser = {
  username: "test_username",
  password: "test_password",
  role: "SuperAdmin",
};
