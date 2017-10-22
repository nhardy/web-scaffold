describe('API - Healthcheck', () => {
  it('should return the correct response (200)', () => request.get('/api/healthcheck')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.equal({ status: 'ok' });
    }));
});
