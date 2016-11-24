import { ModworldPage } from './app.po';

describe('modworld App', function() {
  let page: ModworldPage;

  beforeEach(() => {
    page = new ModworldPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
