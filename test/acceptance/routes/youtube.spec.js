describe('YouTube redirect', () => {
  before(() => {
    nock('https://www.youtube.com')
      .get('/channel/UCryVek7qe6Jodw4ZYbrgkHA')
      .reply(200, '');
  });

  it('should redirect', () => request.get('/youtube')
    .then((res) => {
      expect(res).to.redirectTo('https://www.youtube.com/channel/UCryVek7qe6Jodw4ZYbrgkHA');
    }));
});
