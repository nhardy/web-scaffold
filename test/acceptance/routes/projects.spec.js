describe('Projects Page', () => {
  it('should load a page with a 200 response code', () => request.get('/projects')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.html;
    }));
});
