import { PwMoneyAppPage } from './app.po';

describe('pw-money-app App', () => {
  let page: PwMoneyAppPage;

  beforeEach(() => {
    page = new PwMoneyAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
