import {
  RouteReuseStrategy,
  DefaultUrlSerializer,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
} from '@angular/router';

export class AppRoutingCache implements RouteReuseStrategy {
  public static handlers: { [key: string]: DetachedRouteHandle } = {};

  // 判斷路由是否能重複使用
  public shouldDetach({ data }: ActivatedRouteSnapshot): boolean {
    return data['keep'] ?? false;
  }

  // 當路由離開時，會觸發此方法
  public store(
    { data, routeConfig }: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle
  ): void {
    // 將目前路由內容暫存起來
    // key 網址 value 元件
    if(routeConfig?.path && data['keep'])
      AppRoutingCache.handlers[routeConfig.path] = handle;
  }

  // 當路由進入時，可判斷是否還原路由的暫存內容
  public shouldAttach({ data, routeConfig }: ActivatedRouteSnapshot): boolean {
    if(routeConfig?.path && !!data?.keep)
      return  !!AppRoutingCache.handlers[routeConfig?.path];
    else
      return false;
  }
  
  // 從 Cache 中取得對應的暫存內容
  retrieve({ data, routeConfig }: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!data['keep'] || !routeConfig) 
      return null;
    else if(routeConfig.loadChildren || routeConfig.children)
      return null
    else
      return routeConfig.path ? AppRoutingCache.handlers[routeConfig.path] : null;
  }

  // 判斷是否同一路由
  public shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === current.routeConfig;
  }
}
