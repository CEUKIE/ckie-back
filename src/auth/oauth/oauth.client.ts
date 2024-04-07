// TODO 다른 소셜 로그인 구현 후, any -> 공통 타입
export abstract class OAuthClient {
  public abstract login(dto: any): Promise<{ accessToken: string }>;
  protected abstract getToken(data: any): Promise<string>;
  protected abstract getUserData(data: any, token: string): any;
}
