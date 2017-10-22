describe('favicon.txt', () => {
  it('should load a text file with a 200 response code', () => request.get('/robots.txt')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.text;
    }));
});
