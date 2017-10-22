describe('Contact Page', () => {
  it('should load a page with a 200 response code', () => request.get('/')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.html;
    }));
});
