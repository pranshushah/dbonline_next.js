/**
 * do not include "/" in url.
 */
export class RedirectAfterLogin {
  private static _url = 'dashboard';

  static get url(): string {
    return RedirectAfterLogin._url;
  }
  static set url(url: string) {
    RedirectAfterLogin._url = url;
  }
}
