describe('LinkedIn redirect', () => {
  before(() => {
    nock('https://www.linkedin.com')
      .get('/in/nathan-hardy/')
      .reply(200, '');
  });

  it('should redirect', () => request.get('/linkedin')
    .then((res) => {
      expect(res).to.redirectTo('https://www.linkedin.com/in/nathan-hardy/');
    }));
});
