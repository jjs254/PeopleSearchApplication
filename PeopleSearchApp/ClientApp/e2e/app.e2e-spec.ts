import { AppPage } from './app.po';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display search message', () => {
    page.navigateTo();
    expect(page.getMainHeading()).toEqual('Search Database');
  });
});
