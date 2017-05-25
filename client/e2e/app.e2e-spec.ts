import { SphereClientPage } from './app.po';

describe('sphere-client App', function() {
  let page: SphereClientPage;

  beforeEach(() => {
    page = new SphereClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});