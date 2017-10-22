describe('CV Page', () => {
  it('should load a page with a 200 response code', () => request.get('/cv')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.html;
    }));
});
