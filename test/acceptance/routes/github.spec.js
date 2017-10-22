describe('GitHub redirect', () => {
  before(() => {
    nock('https://github.com')
      .get('/nhardy')
      .reply(200, '');
  });

  it('should redirect', () => request.get('/github')
    .then((res) => {
      expect(res).to.redirectTo('https://github.com/nhardy');
    }));
});
