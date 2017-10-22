describe('favicon.ico', () => {
  it('should have a 200 response code and the correct Content-Type', () => request.get('/favicon.ico')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res).to.have.header('content-type', /^image\/vnd\.microsoft\.icon(?:;|$)/);
    }));
});
